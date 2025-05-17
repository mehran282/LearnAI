type TicketStatus = 'new' | 'in_progress' | 'answered' | 'closed';

type Props = {
  status: TicketStatus;
  className?: string;
};

export const TicketStatusBadge = ({ status, className = '' }: Props) => {
  const statusConfig = {
    new: {
      label: 'جدید',
      color: 'bg-blue-100 text-blue-800'
    },
    in_progress: {
      label: 'در حال بررسی',
      color: 'bg-yellow-100 text-yellow-800'
    },
    answered: {
      label: 'پاسخ داده شده',
      color: 'bg-green-100 text-green-800'
    },
    closed: {
      label: 'بسته شده',
      color: 'bg-gray-100 text-gray-800'
    }
  };

  const { label, color } = statusConfig[status];

  return (
    <span className={`inline-block py-1 px-3 rounded-full text-sm font-medium ${color} ${className}`}>
      {label}
    </span>
  );
}; 