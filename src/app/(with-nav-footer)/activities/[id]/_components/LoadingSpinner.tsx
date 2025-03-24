const LoadingSpinner = () => (
  <div
    className='flex items-center justify-center'
    style={{
      minHeight: 'calc(100vh - 230px)',
      position: 'relative',
    }}
  >
    <div className='absolute inset-0 top-[-70px] flex items-center justify-center'>
      <div className='spinner-border h-16 w-16 animate-spin rounded-full border-4 border-solid border-green-100 border-t-transparent'></div>
    </div>
  </div>
);

export default LoadingSpinner;
