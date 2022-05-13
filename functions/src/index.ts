import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import axios from "axios";

admin.initializeApp();

type LocationIQErrorResponse = {
  error: string;
}

type LocationIQSuccessResponse = {
  error: null;
  address: {
    city: string;
    country: string;
  }
};

type LocationIQResponse = LocationIQErrorResponse | LocationIQSuccessResponse

const getReverseGeocodingUrl = (apiKey: string, lat: string, long: string) => {
  return `https://eu1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${lat}&lon=${long}&format=json`;
};

export const getAddress = functions.runWith({secrets: ['LOCATIONIQ_API_KEY']})
  .https
  .onCall(async (data) => {
    const apiKey = process.env.LOCATIONIQ_API_KEY;
    const { lat, long } = data;

    if (apiKey == null) {
      functions.logger.error('LOCATIONIQ_API_KEY is not set for some reason');

      throw new functions.https.HttpsError('internal', 'Internal server error');
    }

    if (lat == null || long == null) {
      throw new functions.https.HttpsError('invalid-argument', 'Latitude and longitude are required');
    }

    const url = getReverseGeocodingUrl(apiKey, lat, long);

    try {
      const apiResponse = await axios.get<LocationIQResponse>(url);
      const data = apiResponse.data;

      if (data.error != null) {
        functions.logger.error(`Failed to perform reverse geocoding against the given coordinates due to: ${JSON.stringify(data)}`);

        throw new functions.https.HttpsError('internal', `Failed to perform reverse geocoding against the given coordinates due to: ${JSON.stringify(data)}`);
      }

      const { country, city } = data.address;

      return {
        country, 
        city
      };     
    } catch (error) {
      functions.logger.error(`Failed to perform reverse geocoding against the given coordinates due to: ${JSON.stringify(error)}`);

      throw new functions.https.HttpsError('internal', 'Internal server error');
    }
  }
);

const IP_GEOLOCATION_ENDPOINT = 'http://ip-api.com/json/';

type IpGeolocationResponse = {
  ip: string;
  country: string;
  city: string;
  status: string;
};

export const getAddressByIp = functions
  .https
  .onCall(async (_, context) => {
    const ip = context.rawRequest.headers['fastly-client-ip'] ?? context.rawRequest.ip;

    functions.logger.debug(`Got client IP: ${ip}`);

    try {
      const apiResponse = await axios.get<IpGeolocationResponse>(IP_GEOLOCATION_ENDPOINT + ip);
      const { country, city, status } = apiResponse.data;

      if (status !== "success") {
        functions.logger.error(`Failed to get location by IP ${ip} with status: ${status}`);

        throw new functions.https.HttpsError('internal', 'Internal server error');
      }

      return {
        country,
        city
      };
    } catch (error) {
      throw new functions.https.HttpsError('internal', 'Internal server error');
    }
  });

const RANDOM_QUOTE_URL = 'https://zenquotes.io/api/random';

type ZenQuotesQuote = {
  a: string;
  q: string;
};

type ZenQuotesResponse = ZenQuotesQuote[];

export const getRandomQuote = functions
  .https
  .onCall(async () => {
    try {
      const apiResponse = await axios.get<ZenQuotesResponse>(RANDOM_QUOTE_URL);
      const [{q: text, a: author}] = apiResponse.data;

      return {
        text,
        author
      };
    } catch (error) {
      functions.logger.error(`Failed to get a random quote due to: ${JSON.stringify(error)}`);

      throw new functions.https.HttpsError('internal', 'Failed to get a quote');
    }
  });
