import { MaterialIcon } from '../icons/MaterialIcon';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
  icon: string;
  title: string;
  description?: string;
}

export function EmptyState({ icon, title, description }: EmptyStateProps) {
  return (
    <div className={styles.empty}>
      <div className={styles.iconWrap}>
        <MaterialIcon name={icon} size={30} />
      </div>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
    </div>
  );
}
