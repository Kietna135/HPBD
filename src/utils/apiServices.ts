// API Services for Birthday Greeting Experience

export interface InspirationalQuote {
  content: string;
  author: string;
  translation?: string;
}

export interface WeatherData {
  temp: number;
  weatherCode: number;
  condition: string;
  icon: string;
  city: string;
}

export interface ZodiacProfile {
  sign: string;
  vietnameseSign: string;
  symbol: string;
  element: string;
  rulingPlanet: string;
  luckyStone: string;
  luckyNumber: string;
  traits: string[];
  motto: string;
}

// Zodiac Profile for September 28 (Libra / Thiên Bình)
export const LIBRA_PROFILE: ZodiacProfile = {
  sign: 'Libra',
  vietnameseSign: 'Thiên Bình',
  symbol: '♎',
  element: 'Khí (Air) • Hòa Nhã & Tinh Tế',
  rulingPlanet: 'Sao Kim (Venus) • Đại diện cho sắc đẹp & nghệ thuật',
  luckyStone: 'Kim cương & Đá Opal ngũ sắc',
  luckyNumber: '6, 15, 24, 28',
  traits: ['Duyên dáng', 'Nhạy bén', 'Tràn đầy năng lượng', 'Tâm hồn nghệ thuật', 'Tốt bụng'],
  motto: 'Mang vẻ đẹp, sự cân bằng và tình yêu thương lan tỏa đến mọi người.'
};

// Birthday Oracle Fortunes
export const ORACLE_FORTUNES = [
  {
    title: '✨ Tinh Tú Tỏa Sáng',
    message: 'Tuổi mới mở ra vận hội rực rỡ, mọi nỗ lực và tài năng của Thụy Vy sẽ được công nhận và gặt hái thành quả xứng đáng!',
    tag: 'Sự Nghiệp & Danh Vọng'
  },
  {
    title: '💖 Trái Tim Ấm Áp',
    message: 'Bạn luôn được bao bọc bởi những tình cảm chân thành nhất. Những mối quan hệ đẹp đẽ sẽ tiếp thêm nguồn năng lượng dồi dào.',
    tag: 'Tình Yêu & Bạn Bè'
  },
  {
    title: '🌸 Tâm Hồn An Nhiên',
    message: 'Một năm của sự bình yên trong tâm trí, sức khỏe dồi dào và luôn tìm thấy niềm vui trong từng khoảnh khắc giản đơn.',
    tag: 'Thân - Tâm - Trí'
  },
  {
    title: '💎 Vận May Bất Ngờ',
    message: 'Vũ trụ đã chuẩn bị những món quà bất ngờ dành riêng cho bạn trong những chuyến hành trình phía trước!',
    tag: 'May Mắn & Tài Lộc'
  },
  {
    title: '🌈 Tự Do & Khát Vọng',
    message: 'Hãy vững tin bước tiếp với những đam mê cháy bỏng. Cánh cửa thành công luôn rộng mở chào đón bạn.',
    tag: 'Ước Mơ Vươn Xa'
  }
];

// Curated fallbacks for quotes
const FALLBACK_QUOTES: InspirationalQuote[] = [
  {
    content: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    translation: "Tương lai thuộc về những ai luôn tin vào vẻ đẹp của ước mơ chính mình."
  },
  {
    content: "She remembered who she was and the game changed.",
    author: "Lalah Delia",
    translation: "Khi nhận ra giá trị tuyệt vời của bản thân, cả thế giới sẽ mở lối cho bạn."
  },
  {
    content: "Live life in full bloom.",
    author: "Birthday Wisdom",
    translation: "Hãy sống một cuộc đời rạng rỡ và ngát hương như những đóa hoa mùa xuân."
  },
  {
    content: "You are capable of amazing things.",
    author: "Cosmic Affirmation",
    translation: "Bạn sở hữu tiềm năng vô hạn để tạo nên những điều phi thường."
  }
];

// Fetch dynamic quote from public API with timeout & fallback
export async function fetchDailyQuote(): Promise<InspirationalQuote> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const res = await fetch('https://api.quotable.io/random?tags=inspirational|happiness|life', {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      return {
        content: data.content,
        author: data.author
      };
    }
  } catch {
    // Fallback to random curated quote
  }
  const randomIdx = Math.floor(Math.random() * FALLBACK_QUOTES.length);
  return FALLBACK_QUOTES[randomIdx];
}

// Fetch live weather from Open-Meteo API
export async function fetchLiveWeather(): Promise<WeatherData> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=10.8231&longitude=106.6297&current_weather=true',
      { signal: controller.signal }
    );
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const code = data.current_weather?.weathercode ?? 0;
      const temp = Math.round(data.current_weather?.temperature ?? 28);
      return {
        temp,
        weatherCode: code,
        condition: code <= 3 ? 'Trời trong xanh, ngập nắng đẹp' : 'Dịu mát, nhiều mây êm đềm',
        icon: code <= 3 ? '☀️' : '⛅',
        city: 'Việt Nam'
      };
    }
  } catch {
    // Fallback
  }
  return {
    temp: 28,
    weatherCode: 1,
    condition: 'Thời tiết tuyệt vời ngày 28/09',
    icon: '✨',
    city: 'Việt Nam'
  };
}
