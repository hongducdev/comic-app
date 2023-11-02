import { getGenres } from "../apis";

// chuyển số sang kiểu K, M, B, T
export const formatNumber = (number) => {
  if (number < 1000) return number;
  if (number >= 1000 && number < 1000000)
    return (number / 1000).toFixed(1) + "K";
  if (number >= 1000000 && number < 1000000000)
    return (number / 1000000).toFixed(1) + "M";
  if (number >= 1000000000 && number < 1000000000000)
    return (number / 1000000000).toFixed(1) + "B";
  if (number >= 1000000000000) return (number / 1000000000000).toFixed(1) + "T";
};

// chuyển đổi trạng thái của truyện và hiển thị màu sắc tương ứng
export const convertStatus = (status) => {
  switch (status) {
    case "Completed":
      return "Đã hoàn thành";
    case "Ongoing":
      return "Đang tiến hành";
    case "Updating":
      return "Đang cập nhật";
    default:
      return "Đang tiến hành";
  }
};

// Tìm id của genre từ tên genre
export const findGenreId = async (genre) => {
  const genreList = await getGenres();
  const genreId = genreList.find((item) => item.name === genre).id;
  return genreId;
};
