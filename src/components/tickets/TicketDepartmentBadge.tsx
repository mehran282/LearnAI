export type TicketDepartment = 'education' | 'technical' | 'financial';

type Props = {
  department: TicketDepartment;
  className?: string;
};

export const TicketDepartmentBadge = ({ department, className = '' }: Props) => {
  const departmentConfig = {
    education: {
      label: 'آموزش',
      color: 'bg-purple-100 text-purple-800'
    },
    technical: {
      label: 'فنی',
      color: 'bg-blue-100 text-blue-800'
    },
    financial: {
      label: 'مالی',
      color: 'bg-green-100 text-green-800'
    }
  };

  const { label, color } = departmentConfig[department];

  return (
    <span className={`inline-block py-1 px-3 rounded-full text-sm font-medium ${color} ${className}`}>
      {label}
    </span>
  );
}; 