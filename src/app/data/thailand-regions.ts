// 地区类型定义
export interface District {
  id: string;
  name: string;
}

export interface Province {
  name: string;
  districts: District[];
}

export type ThailandRegions = {
  [key: string]: Province;
};

// 泰国省份和地区数据
export const thailandRegions: ThailandRegions = {
  'Bangkok': {
    name: '曼谷',
    districts: [
      { id: 'watthana', name: 'Watthana (วัฒนา)' },
      { id: 'pathum-wan', name: 'Pathum Wan (ปทุมวัน)' },
      { id: 'ratchathewi', name: 'Ratchathewi (ราชเทวี)' },
      { id: 'bang-rak', name: 'Bang Rak (บางรัก)' },
      { id: 'sathon', name: 'Sathon (สาทร)' }
    ]
  },
  'Nonthaburi': {
    name: '暖武里',
    districts: [
      { id: 'muang', name: 'Mueang Nonthaburi (เมืองนนทบุรี)' },
      { id: 'bang-yai', name: 'Bang Yai (บางใหญ่)' },
      { id: 'bang-bua-thong', name: 'Bang Bua Thong (บางบัวทอง)' },
      { id: 'pak-kret', name: 'Pak Kret (ปากเกร็ด)' }
    ]
  },
  'Samut Prakan': {
    name: '沙没巴干',
    districts: [
      { id: 'muang', name: 'Mueang Samut Prakan (เมืองสมุทรปราการ)' },
      { id: 'bang-bo', name: 'Bang Bo (บางบ่อ)' },
      { id: 'bang-phli', name: 'Bang Phli (บางพลี)' },
      { id: 'phra-pradaeng', name: 'Phra Pradaeng (พระประแดง)' }
    ]
  },
  'Pathum Thani': {
    name: '巴吞他尼',
    districts: [
      { id: 'muang', name: 'Mueang Pathum Thani (เมืองปทุมธานี)' },
      { id: 'khlong-luang', name: 'Khlong Luang (คลองหลวง)' },
      { id: 'thanyaburi', name: 'Thanyaburi (ธัญบุรี)' },
      { id: 'lam-luk-ka', name: 'Lam Luk Ka (ลำลูกกา)' }
    ]
  },
  'Chonburi': {
    name: '春武里',
    districts: [
      { id: 'muang', name: 'Mueang Chonburi (เมืองชลบุรี)' },
      { id: 'pattaya', name: 'Pattaya (พัทยา)' },
      { id: 'si-racha', name: 'Si Racha (ศรีราชา)' },
      { id: 'bang-lamung', name: 'Bang Lamung (บางละมุง)' }
    ]
  }
}; 