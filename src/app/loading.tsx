import CircularProgress from '@mui/material/CircularProgress';

export default function Loading() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        width: '100%',
      }}
    >
      <CircularProgress size={40} color="primary" />
    </div>
  );
}
