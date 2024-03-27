interface ReportCardProps {
    children: React.ReactNode;
    title: string;
}
const ReportCard: React.FC<ReportCardProps> = ({ children, title }) => {
    return (
        <div className="bg-white border border-gray-300 rounded-md p-4 w-full h-full shadow-md">
            <h1 className="text-xl font-semibold mb-2">{title}</h1>
            {children}
        </div>
    );
};

export default ReportCard;
