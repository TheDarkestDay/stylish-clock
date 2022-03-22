import classNames from 'classnames';

import styles from './FlexRow.module.css';

type Props = {
  children: React.ReactNode,
  alignItems?: 'start',
  className?: string,
};

export const FlexRow = ({children, className, alignItems}: Props) => {
  const containerClassName = classNames(
    styles.row, 
    alignItems === 'start' && styles.rowAlignItemsStart, 
  className);

  return (
    <div className={containerClassName}>
      {children}
    </div>
  );
};