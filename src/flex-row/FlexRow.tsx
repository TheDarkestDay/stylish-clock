import classNames from 'classnames';

import styles from './FlexRow.module.css';

type Props = {
  children: React.ReactNode,
  alignItems?: 'start',
  className?: string,
  style?: React.CSSProperties
};

export const FlexRow = ({children, className, alignItems, style}: Props) => {
  const containerClassName = classNames(
    styles.row, 
    alignItems === 'start' && styles.rowAlignItemsStart, 
  className);

  return (
    <div style={style} className={containerClassName}>
      {children}
    </div>
  );
};