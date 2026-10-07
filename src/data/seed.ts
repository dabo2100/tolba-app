import type { Hospital, Administration, DiwanDept, DiwanWfItem, WfItem, AppDataSnapshot } from '../domain/models'
import { directorateManager, directorateUnits, workforceSpecializations } from './reference'

export const seedDiwanDepartments: DiwanDept[] = [
  { name: 'الرقابة الصحية والتفتيش',    icon: '🔍', staff: 41, head: 'د. هشام الدسوقي',      type: 'فنية'    },
  { name: 'التخطيط والمتابعة',           icon: '📈', staff: 27, head: 'د. خالد السيد',        type: 'فنية'    },
  { name: 'تكنولوجيا المعلومات',        icon: '💻', staff: 22, head: 'م. أحمد مصطفى',        type: 'فنية'    },
  { name: 'الصحة الإنجابية وصحة الأم',  icon: '🌸', staff: 33, head: 'د. نادية عبد الله',    type: 'فنية'    },
  { name: 'صحة الطفل والتطعيمات',       icon: '💉', staff: 38, head: 'د. رضا البحراوي',      type: 'فنية'    },
  { name: 'التثقيف الصحي',              icon: '📚', staff: 16, head: 'أ. سمر محمود',         type: 'فنية'    },
  { name: 'إدارة الأمراض المزمنة',      icon: '❤️‍🩹', staff: 24, head: 'د. عمرو عبد الرازق',  type: 'فنية'    },
  { name: 'الرعاية الصحية الأولية',     icon: '🏥', staff: 44, head: 'د. إيمان السيد',       type: 'فنية'    },
  { name: 'الشؤون الإدارية والمالية',   icon: '📁', staff: 48, head: 'أ. سامي عبد الفتاح',  type: 'إدارية'  },
  { name: 'الموارد البشرية',             icon: '👥', staff: 32, head: 'أ. منى إبراهيم',       type: 'إدارية'  },
  { name: 'الشؤون القانونية',           icon: '⚖️', staff: 14, head: 'م. رانيا حسن',         type: 'إدارية'  },
  { name: 'العلاقات العامة والإعلام',   icon: '📢', staff: 18, head: 'أ. ياسمين فوزي',       type: 'إدارية'  },
  { name: 'المالية والحسابات',           icon: '💰', staff: 35, head: 'أ. محمود الشوربجي',    type: 'إدارية'  },
  { name: 'إدارة المخازن والتجهيزات',   icon: '📦', staff: 29, head: 'أ. وليد عثمان',        type: 'إدارية'  },
].map((item, i) => ({ ...item, id: `diwan-dept-${String(i + 1).padStart(2, '0')}` }))

export const seedDiwanWorkforce: DiwanWfItem[] = [
  { label: 'أطباء بشري',         icon: '👨‍⚕️', count: 68,  color: '#0369a1' },
  { label: 'أطباء أسنان',        icon: '🦷',   count: 22,  color: '#7c3aed' },
  { label: 'صيادلة',             icon: '💊',   count: 31,  color: '#d97706' },
  { label: 'تمريض',              icon: '🩺',   count: 145, color: '#16a34a' },
  { label: 'علاج طبيعي',         icon: '🏃',   count: 18,  color: '#0d9488' },
  { label: 'أخصائي علوم صحية',  icon: '🔬',   count: 42,  color: '#dc2626' },
  { label: 'فنيون',              icon: '🔧',   count: 58,  color: '#ea580c' },
  { label: 'إداريون',            icon: '📁',   count: 201, color: '#6d28d9' },
].map((item, i) => ({ ...item, id: `diwan-wf-${String(i + 1).padStart(2, '0')}` }))

export const seedHospitals: Hospital[] = [
  { name: 'مستشفى كفرالشيخ العام',             type: 'عام',     staff: 520, beds: 350, manager: 'د. أحمد سعيد محمد'        },
  { name: 'مستشفى دسوق العام',                 type: 'عام',     staff: 480, beds: 300, manager: 'د. وليد عبد الرحمن'       },
  { name: 'مستشفى سيدي غازي النموذجي',        type: 'نموذجي',  staff: 310, beds: 200, manager: 'د. علاء الدين حسين'       },
  { name: 'مستشفى بيلا النموذجي',             type: 'نموذجي',  staff: 290, beds: 180, manager: 'د. محمود الشافعي'          },
  { name: 'مستشفى سيدي سالم المركزي',         type: 'مركزي',   staff: 380, beds: 250, manager: 'د. هشام الدسوقي'           },
  { name: 'مستشفى فوة المركزي',               type: 'مركزي',   staff: 360, beds: 220, manager: 'د. خالد السيد علي'         },
  { name: 'مستشفى مطوبس المركزي',             type: 'مركزي',   staff: 340, beds: 210, manager: 'د. رضا عبد الفتاح'         },
  { name: 'مستشفى الرياض المركزي',            type: 'مركزي',   staff: 320, beds: 200, manager: 'د. سامي البحراوي'           },
  { name: 'مستشفى الحامول المركزي',           type: 'مركزي',   staff: 300, beds: 190, manager: 'د. عمرو عبد الرازق'        },
  { name: 'مستشفى برج البرلس المركزي',        type: 'مركزي',   staff: 280, beds: 170, manager: 'د. إيهاب النجار'           },
  { name: 'مستشفى صدر كفرالشيخ',             type: 'نوعي',    staff: 210, beds: 120, manager: 'د. مصطفى العمروسي'          },
  { name: 'مستشفى حميات كفرالشيخ',           type: 'نوعي',    staff: 195, beds: 100, manager: 'د. نادية عبد الله'          },
  { name: 'مستشفى الأمراض الجلدية والجزام',   type: 'نوعي',    staff: 185, beds: 90,  manager: 'د. إيمان السيد محمد'       },
  { name: 'مستشفى رمد كفرالشيخ',             type: 'نوعي',    staff: 175, beds: 80,  manager: 'د. طارق عبد الحميد'        },
  { name: 'مستشفى حميات دسوق',               type: 'نوعي',    staff: 190, beds: 100, manager: 'د. سمير إبراهيم فرج'       },
  { name: 'مستشفى فيصل سعود',                type: 'نوعي',    staff: 240, beds: 130, manager: 'د. أشرف الجوهري'            },
  { name: 'مستشفى حميات مطوبس',              type: 'نوعي',    staff: 160, beds: 80,  manager: 'د. يسرى محمد الشاذلي'      },
  { name: 'مستشفى حميات بيلا',               type: 'نوعي',    staff: 155, beds: 75,  manager: 'د. منى إبراهيم'            },
].map((item, i) => ({ ...item, id: `hospital-${String(i + 1).padStart(2, '0')}` }))

export const seedAdministrations: Administration[] = [
  { name: 'كفرالشيخ',   staff: 1240, units: 18, manager: 'د. علي حسن عبد الله'       },
  { name: 'دسوق',        staff: 980,  units: 14, manager: 'د. محمد صلاح الدين'         },
  { name: 'سيدي سالم',  staff: 620,  units: 9,  manager: 'د. حسام محمود فوزي'         },
  { name: 'فوة',         staff: 540,  units: 8,  manager: 'د. شريف عبد الغني'          },
  { name: 'مطوبس',       staff: 710,  units: 11, manager: 'د. ياسر إبراهيم السيد'      },
  { name: 'قلين',        staff: 590,  units: 8,  manager: 'د. أمل عبد المنعم'           },
  { name: 'بيلا',        staff: 670,  units: 10, manager: 'د. عصام الدين حلمي'         },
  { name: 'الحامول',    staff: 480,  units: 7,  manager: 'د. فاطمة زكريا محمد'        },
  { name: 'بلطيم',       staff: 420,  units: 6,  manager: 'د. محمد عبد الصمد'          },
  { name: 'الرياض',      staff: 390,  units: 6,  manager: 'د. نور الدين مصطفى'         },
  { name: 'سيدي غازي',  staff: 350,  units: 5,  manager: 'د. سحر رمضان علي'           },
].map((item, i) => ({ ...item, id: `administration-${String(i + 1).padStart(2, '0')}` }))

export const seedWorkforce: WfItem[] = [
  { label: 'أطباء بشري',          icon: '👨‍⚕️', directorate: 1240, administration: 310, hospital: 186, color: '#0369a1' },
  { label: 'أطباء أسنان',         icon: '🦷',   directorate: 420,  administration: 105, hospital: 63,  color: '#7c3aed' },
  { label: 'علاج طبيعي',          icon: '🏃',   directorate: 310,  administration: 78,  hospital: 47,  color: '#0d9488' },
  { label: 'صيادلة',              icon: '💊',   directorate: 530,  administration: 133, hospital: 80,  color: '#d97706' },
  { label: 'تمريض',               icon: '🩺',   directorate: 2840, administration: 710, hospital: 426, color: '#16a34a' },
  { label: 'فنيون',               icon: '🔧',   directorate: 920,  administration: 230, hospital: 138, color: '#ea580c' },
  { label: 'كيميائي',             icon: '🧪',   directorate: 80,   administration: 20,  hospital: 12,  color: '#dc2626' },
  { label: 'إداريون والكتبة',     icon: '📁',   directorate: 1100, administration: 275, hospital: 165, color: '#6d28d9' },
  { label: 'أخصائي اجتماعي',     icon: '🤝',   directorate: 120,  administration: 30,  hospital: 18,  color: '#0891b2' },
  { label: 'أخصائي نفسي',        icon: '🧠',   directorate: 90,   administration: 22,  hospital: 13,  color: '#be185d' },
  { label: 'مهندس أجهزة طبية',   icon: '⚙️',   directorate: 60,   administration: 15,  hospital: 9,   color: '#4f46e5' },
  { label: 'عمال',                icon: '👷',   directorate: 1200, administration: 300, hospital: 180, color: '#78716c' },
]

export function createSeedSnapshot(): AppDataSnapshot {
  return {
    hosps: seedHospitals.map(h => ({ ...h })),
    admins: seedAdministrations.map(a => ({ ...a })),
    diwanDepts: seedDiwanDepartments.map(d => ({ ...d })),
    diwanWf: seedDiwanWorkforce.map(w => ({ ...w })),
    wf: seedWorkforce.map(w => ({ ...w })),
    workforceSpecializations: structuredClone(workforceSpecializations),
    directorateUnits: directorateUnits.map(unit => ({ ...unit })),
    directorateManager,
    changeLog: [],
  }
}
