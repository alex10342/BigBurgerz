type Props = {
  progress: string,
  width: string,
  text: string
}

// When component is called, return HTML
export default function Loadingbar({ progress, width, text }: Props) {
  return (
    <div style={{width: width}}>
      <div className="flex justify-between">
        <span className="text-base font-medium text-blue-700">{text}</span>
        <span className="text-sm font-medium text-blue-700">{Math.floor(parseInt(progress))}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-400">
        <div className={`bg-blue-600 h-1.5 rounded-full`} style={{width: progress}}></div>
      </div>
    </div>
  );
}