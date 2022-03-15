import classNames from 'classnames';

import styles from './FlexRow.module.css';

type Props = {
  children: React.ReactNode,
  className?: string,
};

export const FlexRow = ({children, className}: Props) => {
  const containerClassName = classNames(styles.flexRow, className);

  return (
    <div className={containerClassName}>
      {children}
    </div>
  );
};