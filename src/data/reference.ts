import type { SpecData } from '../domain/models'

export const directorateManager = 'د. محمد أبوالسعد'

export const typeColors: Record<string, { bg: string; text: string; border: string }> = {
  'عام':     { bg: '#e0f2fe', text: '#0369a1', border: '#bae6fd' },
  'نموذجي': { bg: '#dcfce7', text: '#16a34a', border: '#bbf7d0' },
  'مركزي':  { bg: '#fef3c7', text: '#d97706', border: '#fde68a' },
  'نوعي':   { bg: '#ede9fe', text: '#7c3aed', border: '#ddd6fe' },
}

export const workforceSpecializations: Record<string, SpecData> = {
  'أطباء بشري': {
    gradeLabels: ['استشاري', 'أخصائي', 'ممارس', 'مقيم'],
    icon: '👨‍⚕️', color: '#0369a1',
    specs: [
      { name: 'نساء وتوليد',              g1: 18, g2: 46, g3: 30, g4: 16 },
      { name: 'جراحة عامة',               g1: 16, g2: 42, g3: 28, g4: 14 },
      { name: 'باطنة عامة',               g1: 14, g2: 36, g3: 24, g4: 12 },
      { name: 'أطفال',                     g1: 12, g2: 30, g3: 20, g4: 10 },
      { name: 'تخدير',                     g1: 10, g2: 26, g3: 18, g4:  9 },
      { name: 'جراحة عظام',               g1: 10, g2: 24, g3: 16, g4:  8 },
      { name: 'قلب وأوعية دموية',         g1:  9, g2: 22, g3: 15, g4:  7 },
      { name: 'استقبال وطوارئ',           g1:  7, g2: 20, g3: 13, g4:  7 },
      { name: 'أشعة تشخيصية',             g1:  7, g2: 18, g3: 12, g4:  6 },
      { name: 'عناية مركزة',              g1:  6, g2: 16, g3: 11, g4:  5 },
      { name: 'رمد',                       g1:  5, g2: 14, g3:  9, g4:  5 },
      { name: 'جلدية وتناسلية',           g1:  5, g2: 13, g3:  9, g4:  4 },
      { name: 'نفسية وعصبية',             g1:  5, g2: 13, g3:  9, g4:  4 },
      { name: 'أنف وأذن',                 g1:  4, g2: 12, g3:  8, g4:  4 },
      { name: 'جهاز هضمي وكبد',           g1:  4, g2: 12, g3:  8, g4:  4 },
      { name: 'أمراض صدرية',              g1:  4, g2: 11, g3:  7, g4:  3 },
      { name: 'جراحة مسالك بولية',        g1:  4, g2: 11, g3:  7, g4:  3 },
      { name: 'كلى صناعي',                g1:  3, g2: 10, g3:  7, g4:  3 },
      { name: 'حميات',                    g1:  3, g2: 10, g3:  6, g4:  3 },
      { name: 'أطفال حديثي الولادة',      g1:  3, g2:  9, g3:  6, g4:  3 },
      { name: 'جراحة مخ وأعصاب',          g1:  3, g2:  9, g3:  6, g4:  2 },
      { name: 'جراحة قلب وصدر',           g1:  3, g2:  9, g3:  6, g4:  2 },
      { name: 'جراحة أوعية دموية',        g1:  2, g2:  8, g3:  5, g4:  2 },
      { name: 'روماتيزم وتأهيل',          g1:  2, g2:  8, g3:  5, g4:  2 },
      { name: 'باثولوجي إكلينيكي',        g1:  2, g2:  7, g3:  4, g4:  2 },
      { name: 'حروق وجراحة تجميل',        g1:  2, g2:  7, g3:  4, g4:  2 },
      { name: 'جراحة أطفال',              g1:  2, g2:  7, g3:  4, g4:  2 },
      { name: 'باثولوجي',                 g1:  2, g2:  6, g3:  4, g4:  2 },
      { name: 'بكتريولوجي',               g1:  2, g2:  5, g3:  3, g4:  2 },
      { name: 'بنك دم',                   g1:  2, g2:  5, g3:  3, g4:  2 },
      { name: 'طب مسنين',                 g1:  1, g2:  4, g3:  3, g4:  1 },
      { name: 'طب نووي',                  g1:  1, g2:  4, g3:  3, g4:  1 },
      { name: 'تخاطب وسمعيات',            g1:  1, g2:  3, g3:  2, g4:  1 },
      { name: 'الوراثة',                  g1:  1, g2:  3, g3:  2, g4:  1 },
    ],
  },
  'أطباء أسنان': {
    gradeLabels: ['استشاري', 'أخصائي', 'م. أخصائي', 'مقيم مؤهل', 'مقيم'],
    icon: '🦷', color: '#7c3aed',
    simpleGrades: [45, 120, 95, 85, 75],
  },
  'علاج طبيعي': {
    gradeLabels: ['أخصائي', 'ممارس'],
    icon: '🏃', color: '#0d9488',
    simpleGrades: [140, 170],
  },
  'صيادلة': {
    gradeLabels: ['مؤهل عالي'],
    icon: '💊', color: '#d97706',
    simpleGrades: [530],
  },
  'تمريض': {
    gradeLabels: ['مؤهل عالي', 'مؤهل فوق متوسط', 'مؤهل متوسط'],
    icon: '🩺', color: '#16a34a',
    simpleGrades: [580, 980, 1280],
  },
  'فنيون': {
    gradeLabels: [],
    icon: '🔧', color: '#ea580c',
    simpleSpecs: [
      { name: 'فني معمل ومساعد فني',      count: 120 },
      { name: 'أشعة',                      count: 100 },
      { name: 'تخدير',                     count:  90 },
      { name: 'أجهزة طبية',               count:  85 },
      { name: 'مراقب صحي',                count:  80 },
      { name: 'أسنان',                     count:  75 },
      { name: 'خدمات طبية',               count:  70 },
      { name: 'صيانة',                     count:  65 },
      { name: 'فني مسعف',                 count:  60 },
      { name: 'إحصاء',                     count:  55 },
      { name: 'أخصائي وفني تغذية',        count:  50 },
      { name: 'فني هندسة',                count:  30 },
      { name: 'فني بصريات',               count:  25 },
      { name: 'زراعي',                     count:  15 },
    ],
  },
  'كيميائي': {
    gradeLabels: ['كيميائي'],
    icon: '🧪', color: '#dc2626',
    simpleGrades: [80],
  },
  'إداريون والكتبة': {
    gradeLabels: ['مؤهل عالي', 'مؤهل متوسط'],
    icon: '📁', color: '#6d28d9',
    simpleGrades: [440, 660],
  },
  'أخصائي اجتماعي': {
    gradeLabels: ['أخصائي اجتماعي'],
    icon: '🤝', color: '#0891b2',
    simpleGrades: [120],
  },
  'أخصائي نفسي': {
    gradeLabels: ['أخصائي نفسي'],
    icon: '🧠', color: '#be185d',
    simpleGrades: [90],
  },
  'مهندس أجهزة طبية': {
    gradeLabels: ['مهندس أجهزة طبية'],
    icon: '⚙️', color: '#4f46e5',
    simpleGrades: [60],
  },
  'عمال': {
    gradeLabels: ['معين', 'موسمي'],
    icon: '👷', color: '#78716c',
    simpleGrades: [900, 300],
  },
}

export const gradeColors = ['#0369a1', '#0d9488', '#7c3aed', '#e11d48', '#f59e0b']

export const directorateUnits = [
  { label: 'الأسرة الداخلية',       icon: '🛏️', dirTotal: 1840, unit: 'سرير',   color: '#0369a1', light: '#e0f2fe',  occBase: 78 },
  { label: 'غرف العمليات',           icon: '🏥', dirTotal: 87,   unit: 'غرفة',   color: '#d97706', light: '#fef3c7',  occBase: 68 },
  { label: 'أسرة العناية المركزة',   icon: '❤️‍🔥', dirTotal: 312, unit: 'سرير',   color: '#dc2626', light: '#fee2e2',  occBase: 88 },
  { label: 'أسرة الاستقبال',         icon: '🚪', dirTotal: 524,  unit: 'سرير',   color: '#16a34a', light: '#dcfce7',  occBase: 62 },
  { label: 'ماكينات الغسيل الكلوي', icon: '🫀', dirTotal: 143,  unit: 'ماكينة', color: '#0d9488', light: '#ccfbf1',  occBase: 84 },
  { label: 'أجهزة التنفس',           icon: '🫁', dirTotal: 218,  unit: 'جهاز',   color: '#ea580c', light: '#ffedd5',  occBase: 52 },
  { label: 'حضانات الأطفال',         icon: '🍼', dirTotal: 96,   unit: 'حضانة',  color: '#ec4899', light: '#fce7f3',  occBase: 60 },
]

export const unitNames = ['الحي الأول','الحي الثاني','الضاحية','الروضة','النزهة','المنطقة الصناعية','الأمل','الريف','الجديدة','الشرقية','الغربية','الشمالية','الجنوبية','المركزي','الوادي','الساحل','الهضبة','السهل']
