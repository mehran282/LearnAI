type MessageProps = {
  isAdmin: boolean;
  message: string;
  sender: string;
  date: string;
};

export const TicketMessage = ({ isAdmin, message, sender, date }: MessageProps) => {
  return (
    <div className={`flex ${isAdmin ? 'justify-start' : 'justify-end'} mb-3 md:mb-4`}>
      <div className={`max-w-[85%] sm:max-w-[75%] rounded-lg p-3 md:p-4 ${
        isAdmin ? 'bg-gray-100' : 'bg-blue-100'
      }`}>
        <div className="flex items-center mb-2">
          <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full ${
            isAdmin ? 'bg-blue-600' : 'bg-green-600'
          } flex items-center justify-center text-white font-bold text-xs md:text-sm`}>
            {isAdmin ? 'پ' : 'ش'}
          </div>
          <div className="mr-2">
            <p className="font-bold text-xs md:text-sm">{sender}</p>
            <p className="text-xs text-gray-500">{date}</p>
          </div>
        </div>
        <p className="text-xs md:text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
      </div>
    </div>
  );
}; 