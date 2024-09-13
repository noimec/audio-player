export const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
  return null;
};

export const getAuthHeaders = () => {
  const token = getCookie('__session');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const setCookie = (name: string, value: string, days: number) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = 'expires=' + date.toUTCString();
  document.cookie = `${name}=${value}; ${expires}; path=/`;
};

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};

export const formatDuration = (duration: number): string => {
  const totalSeconds = Math.floor(duration / 1000);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const formattedMinutes = minutes.toString();
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds.toString();

  return `${formattedMinutes}:${formattedSeconds}`;
};

export const timeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const differenceInMs = now.getTime() - date.getTime();

  const days = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));

  if (days > 0) {
    let dayWord;
    if (days % 10 === 1 && days % 100 !== 11) {
      dayWord = 'день';
    } else if (
      [2, 3, 4].includes(days % 10) &&
      ![12, 13, 14].includes(days % 100)
    ) {
      dayWord = 'дня';
    } else {
      dayWord = 'дней';
    }
    return `${days} ${dayWord} назад`;
  }

  return 'только что';
};
