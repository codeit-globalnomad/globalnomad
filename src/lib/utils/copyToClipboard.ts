import { toast } from 'react-toastify';

export const copyToClipboard = async ({
  text,
  successMessage = '복사되었습니다.',
  errorMessage = '복사에 실패했습니다.',
}: {
  text: string;
  successMessage?: string;
  errorMessage?: string;
}) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success(successMessage);
  } catch {
    toast.error(errorMessage);
  }
};
