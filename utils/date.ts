const ThaiFormatDate = (date: Date) => {
  const thaiMonths = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];

  const day = date.getDate()
  const month = thaiMonths[date.getMonth()];
  const year = date.getFullYear();

  return `วันที่ ${day} เดือน${month} ปี ${year}`;
}

export {
  ThaiFormatDate,
}
