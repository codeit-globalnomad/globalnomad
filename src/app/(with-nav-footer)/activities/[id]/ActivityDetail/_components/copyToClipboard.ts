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
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();

      const success = document.execCommand('copy');
      document.body.removeChild(textarea);

      if (!success) throw new Error('Fallback copy failed');
    }

    toast.success(successMessage);
  } catch (e) {
    console.error('복사 실패:', e);
    toast.error(errorMessage);
  }
};
