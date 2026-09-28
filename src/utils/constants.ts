export interface MemoryCard {
  id: number;
  title: string;
  subtitle: string;
  emoji: string;
  color: string;
  gradient: string;
  message: string;
  iconName: string;
}

export interface MysteryGift {
  id: number;
  title: string;
  shortTitle?: string;
  icon: string;
  boxColor: string;
  ribbonColor: string;
  voucher: string;
  description: string;
  blessing: string;
}

export const RECIPIENT_INFO = {
  fullName: "Võ Thiện Thụy Vy",
  shortName: "Thụy Vy",
  birthDay: "28/09",
  specialDate: "28 Tháng 9",
  mainQuote: "Hôm nay là một ngày đặc biệt, vì chính bạn khiến nó trở nên tuyệt vời.",
  subQuote: "Mỗi khoảnh khắc có bạn đều là một mảnh ghép rực rỡ của cuộc sống.",
  personalLetter: `Gửi Thụy Vy thân mến,

Nhân ngày sinh nhật 28/09 thật đặc biệt, chúc Vy luôn giữ nụ cười rạng rỡ như ánh nắng sớm mai, tâm hồn an yên và trái tim luôn ngập tràn nhiệt huyết. 

Chúc cho tuổi mới của Vy sẽ mở ra những cánh cửa may mắn mới, vạn sự hanh thông, công việc thăng hoa, ước mơ nào cũng hóa thành hiện thực. Hãy luôn yêu thương bản thân, tự tin tỏa sáng theo cách riêng của mình, bởi vì chính sự hiện diện của bạn đã làm cho thế giới này trở nên dịu dàng và tuyệt vời hơn rất nhiều! 🌸✨`
};

export const MEMORY_CARDS: MemoryCard[] = [
  {
    id: 1,
    title: "Nụ Cười Tỏa Nắng",
    subtitle: "Luôn vui vẻ & hồn nhiên",
    emoji: "✨",
    color: "#ff758c",
    gradient: "linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)",
    message: "Mong nụ cười của Thụy Vy luôn rạng rỡ trên môi, xua tan mọi âu lo và thắp sáng niềm vui mỗi ngày!",
    iconName: "Sun"
  },
  {
    id: 2,
    title: "Bình Yên & An Nhiên",
    subtitle: "Trái tim dịu dàng",
    emoji: "🌿",
    color: "#4facfe",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    message: "Chúc Thụy Vy mỗi sớm mai đều thấy lòng an yên, đêm về giấc ngủ say và cuộc sống nhẹ nhàng êm đềm!",
    iconName: "Heart"
  },
  {
    id: 3,
    title: "Tuổi Mới Thăng Hoa",
    subtitle: "Rạng rỡ ước mơ",
    emoji: "🚀",
    color: "#f093fb",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    message: "Chúc mọi dự định và hoài bão của Vy trong tuổi mới đều gặt hái thành công rực rỡ và tỏa sáng!",
    iconName: "Sparkles"
  },
  {
    id: 4,
    title: "Vạn Điều May Mắn",
    subtitle: "Vận may ngập tràn",
    emoji: "🍀",
    color: "#43e97b",
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    message: "Mong những điều may mắn, cơ hội quý giá và những niềm vui bất ngờ luôn đồng hành bên cạnh Vy!",
    iconName: "Gift"
  },
  {
    id: 5,
    title: "Sức Khỏe Dồi Dào",
    subtitle: "Năng lượng tràn đầy",
    emoji: "🌸",
    color: "#fa709a",
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    message: "Chúc Thụy Vy luôn có sức khỏe dẻo dai, nhan sắc rạng ngời và ngập tràn năng lượng tươi mới!",
    iconName: "Smile"
  },
  {
    id: 6,
    title: "Mãi Luôn Được Yêu",
    subtitle: "Hạnh phúc đong đầy",
    emoji: "💖",
    color: "#a18cd1",
    gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
    message: "Bởi vì Vy luôn xứng đáng nhận trọn vẹn sự yêu thương, trân trọng và chân thành nhất từ mọi người!",
    iconName: "Crown"
  }
];

export const MYSTERY_GIFTS: MysteryGift[] = [
  {
    id: 1,
    title: "Quà Ngọt Ngào",
    shortTitle: "Ngọt Ngào",
    icon: "🧋",
    boxColor: "#ff758c",
    ribbonColor: "#ffd700",
    voucher: "Voucher 1 Ly Trà Sữa Full Topping ✨",
    description: "Được đổi thưởng bất kỳ lúc nào Thụy Vy thấy thèm ngọt hoặc cần nạp dopamine!",
    blessing: "Chúc Vy luôn tìm thấy vị ngọt ngào giữa cuộc sống bộn bề!"
  },
  {
    id: 2,
    title: "Quà Thư Thái",
    shortTitle: "Thư Thái",
    icon: "☕",
    boxColor: "#667eea",
    ribbonColor: "#ff9a9e",
    voucher: "Voucher 1 Ngày 'Lười Biếng' Hoàn Hảo 🛋️",
    description: "Một ngày không deadline, không âu lo, chỉ có âm nhạc, phim hay và món ngon yêu thích!",
    blessing: "Chúc bạn luôn có những khoảng lặng êm đềm để nạp đầy năng lượng tích cực!"
  },
  {
    id: 3,
    title: "Quà May Mắn",
    shortTitle: "May Mắn",
    icon: "🌟",
    boxColor: "#f6d365",
    ribbonColor: "#fda085",
    voucher: "Vé Thông Hành May Mắn 365 Ngày 🎟️",
    description: "Hiệu lực suốt cả tuổi mới: Đi đâu gặp may đó, làm gì cũng suôn sẻ thuận buồm xuôi gió!",
    blessing: "Vũ trụ sẽ luôn gửi tín hiệu may mắn đến với Thụy Vy!"
  },
  {
    id: 4,
    title: "Quà Ước Nguyện",
    shortTitle: "Ước Nguyện",
    icon: "🪄",
    boxColor: "#b18cfe",
    ribbonColor: "#ff0844",
    voucher: "1 Điều Ước Bất Kỳ Được Thành Hiện Thực 🌠",
    description: "Nhắm mắt lại, nghĩ về mong muốn lớn nhất của bạn lúc này. Điều kỳ diệu đang lắng nghe bạn!",
    blessing: "Tất cả ước nguyện trong tim Vy sẽ sớm trở thành hiện thực!"
  }
];
