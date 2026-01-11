export interface Service {
  id: number;
  name: string;
  profileImage: string;
  categories: string[];
  workType: 'Full-time' | 'Part-time';
  description: string;
  location: string;
  phoneNumber: string;
  reference?: {
    name: string;
    phone?: string;
    email?: string;
    whatsapp?: string;
  };
}

export const services: Service[] = [
  {
    id: 1,
    name: 'Rita',
    profileImage: '/placeholder.svg',
    categories: ['Cleaner'],
    workType: 'Part-time',
    description:
      "Rita is a superb cleaner, incredibly hard-working and extremely trustworthy. She's generally also just a lovely and adaptable person, who could do other tasks (eg collecting groceries, cooking) if desired, including nannying as a mother of young ones herself. She currently works 3 days a week for us (Mon, Weds, Fri) so if you need 1 or 2 days of immediate support, she can offer that now, with her then available full-time from mid-December after our departure.",
    location: 'Accra',
    phoneNumber: '0552175660',
    reference: {
      name: 'Harry',
      whatsapp: 'Harry',
    },
  },
  {
    id: 2,
    name: 'Joyce Asare',
    profileImage: '/placeholder.svg',
    categories: ['Nanny'],
    workType: 'Full-time',
    description:
      'Joyce worked for us for 2 years, but we have relocated, therefore Joyce is looking for new work. She was an amazing, attentive, caring nanny for our baby who was aged 8 months when we hired her. She took her on outings, cooked and fed her, put her to sleep and bathed her. We also had 2 other children Joyce watched from time to time. She also cleaned our home well. Please contact me for further questions.',
    location: 'Accra',
    phoneNumber: '0541279341',
    reference: {
      name: 'Lindsey',
      whatsapp: 'Lindsey',
    },
  },
  {
    id: 3,
    name: 'Connie',
    profileImage: '/placeholder.svg',
    categories: ['Cleaner'],
    workType: 'Part-time',
    description:
      "Connie bakes art! When I first came to Ghana, she came to deep clean my house and since then she has set such a high standard that I can't accept anyone else. She is a kind, wise energy in your house and she thinks with you, while respecting your wishes. She is 100% worth her asking price. Right now, she is looking for work for 3 days per week. The rest she uses to build her baking business.",
    location: 'Accra',
    phoneNumber: '0249352574',
    reference: {
      name: 'Edith',
      phone: '0598295150',
    },
  },
  {
    id: 4,
    name: 'Caleb',
    profileImage: '/placeholder.svg',
    categories: ['Driver'],
    workType: 'Full-time',
    description:
      'I would like to highly recommend him as a driver. He is very respectful, trustworthy and time oriented. He was in charge of picking and dropping the kids to and from school and making house errands. He is very professional and handles his duties with care. He worked with our family for over 5 years.',
    location: 'Accra',
    phoneNumber: '0242907643',
    reference: {
      name: 'Dalane',
      whatsapp: 'Dalane',
    },
  },
  {
    id: 5,
    name: 'Christiana (Christie) Yirenkyiwaa',
    profileImage: '/placeholder.svg',
    categories: ['Registered Nurse', 'Home Care'],
    workType: 'Full-time',
    description:
      'I would also like to recommend Christie, a Registered Nurse with a calm, professional, and compassionate approach to caregiving. She is cheerful, caring, hardworking, and always maintains a positive attitude, making her a great support to both patients and families. She is 25 years old, available to start immediately, and has experience of working with individuals who require medical health support. She is reliable, respectful, and dedicated to her profession. If anyone is looking for a capable, kind, and committed nurse, I highly recommend her. I am happy to provide further information. Live-in or Live out position: open to anywhere within Accra.',
    location: 'Accra',
    phoneNumber: '0241764315',
    reference: {
      name: 'Victoria',
      phone: '0244254449',
    },
  },
  {
    id: 6,
    name: 'Dominic Yeboah',
    profileImage: '/placeholder.svg',
    categories: ['Registered Nurse', 'Home Care'],
    workType: 'Full-time',
    description:
      'I would like to highly recommend Dominic, a dedicated and professional nurse who cared for my elderly father over the past two years. He worked 12-hour shifts with consistency, compassion, and exceptional responsibility. Dominic is trustworthy, patient, very gentle, and caring, and he always goes above and beyond to fulfill his duties. He has been a true blessing to our family, both in his work ethic and in his character. He is also a pastor, which further reflects his integrity and the calm, respectful manner in which he carries himself. Dominic is 25 years old and available to start immediately. Live-in position: open to anywhere within Accra or Live-out position: prefers locations near Achimota or Kasoa. If anyone is looking for a reliable, skilled, and genuinely caring nurse, I can highly recommend him.',
    location: 'Accra (Achimota/Kasoa preferred for live-out)',
    phoneNumber: '0532318184',
    reference: {
      name: 'Victoria',
      phone: '0244254449',
    },
  },
  {
    id: 7,
    name: 'Rosemond',
    profileImage: '/placeholder.svg',
    categories: ['Housekeeper', 'Nanny'],
    workType: 'Part-time',
    description:
      'I know Rosemond, who previously worked with a pharmacist for three years and served as a housekeeper and nanny for my daughter here in Ghana. She often comes to me for support, and she is now looking for a part-time job—three days a week. She is wonderful with children and cooks delicious Ghanaian meals.',
    location: 'Accra',
    phoneNumber: '0591478920',
    reference: {
      name: 'Grazyna',
      phone: '0244660475',
    },
  },
  {
    id: 8,
    name: 'Emmanuella',
    profileImage: '/placeholder.svg',
    categories: ['Cook / Chef', 'Cleaner'],
    workType: 'Part-time',
    description:
      'She is looking for a position three times a week doing cooking and cleaning. Emmanuella worked for us before and was responsible for cooking, cleaning, and shopping. She cooks very well and can also follow recipes accurately. She stopped working with us because she had to take care of her sick mother. She also occasionally helped us look after our children. Unfortunately, we already have someone now, otherwise we would have gladly taken her back.',
    location: 'Accra',
    phoneNumber: '0245615945',
    reference: {
      name: 'Mariama',
      phone: '0549845172',
    },
  },
  {
    id: 9,
    name: 'Victoria',
    profileImage: '/placeholder.svg',
    categories: ['Nanny'],
    workType: 'Full-time',
    description:
      "Victoria has consistently demonstrated exceptional care with young children, from newborns to toddlers. She is engaging, attentive, and anticipates a child's needs with warmth and composure, which creates a safe, nurturing, and stimulating environment for children. During her time caring for our family, she demonstrated Superior infant care skills, including feeding routines, diapering, soothing techniques, and age-appropriate activities that support early development. Strong observational abilities and proactive communication, ensuring parents are kept informed about routines, milestones, and any concerns. A calm, patient demeanor that helps both child and family feel secure, along with reliable, punctual, and discreet service. Safety-first mindset, managing play spaces and routines with careful attention to potential hazards and child-proof practices. Victoria is comfortable working with children from newborn stages through early toddlerhood (up to age 3). Her versatility extends to light, child-focused housekeeping and readiness for emergencies. She adapts well to different family routines and is eager to collaborate with parents to implement consistent schedules and developmental activities. Live out, ready to consider Live In from Monday to Friday.",
    location: 'Accra',
    phoneNumber: '0246960638',
    reference: {
      name: 'Nargiza',
      phone: '0558323821',
    },
  },
  {
    id: 10,
    name: 'Margaret Tetteh',
    profileImage: '/placeholder.svg',
    categories: ['Nanny', 'Housekeeper'],
    workType: 'Full-time',
    description:
      'Ms Margaret initially joined us as a cleaner and, when my daughter was born, seamlessly added newborn Nanny duties. She was a great nanny, and my daughter absolutely adored her. Seeing how responsible and trustworthy she was, we eventually expanded her role to include Housekeeper responsibilities. She became an overall House Manager, essentially running our entire household, which gave my husband (and especially me) the time to focus on personal and professional matters. She was a dedicated live-in member of our family and even moved houses with us. After four years, we regretfully ended our arrangement because we down-sized and all our children are now in school, no longer requiring a full-time nanny, and with the older children also requesting more independence. Currently, Ms Margaret is temporarily nannying for my sister during her visit to Ghana, caring for her newborn (4 months) and her 4-year-old. She is proving to be wonderful with the newborn, just as she was with my daughter, and has been a huge help to my sister, even traveling with them outside of Accra on tourist outings to watch the baby. Ms Margaret will be available for a new live-in, Nanny/Housekeeper role starting the 2nd week of November when my sister returns to Australia. Any family would be incredibly lucky to have her.',
    location: 'Accra',
    phoneNumber: '0598860703',
    reference: {
      name: 'Karen',
      whatsapp: 'Karen',
    },
  },
  {
    id: 11,
    name: 'Leticia Breni',
    profileImage: '/placeholder.svg',
    categories: ['Cleaner', 'Housekeeper'],
    workType: 'Part-time',
    description:
      'Highly recommended, hard working and meticulous. She currently works with me 2 days/week and is looking for additional days. She will also do food prep (chopping, etc.) but no cooking. 45yrs - looking for part time work in Accra.',
    location: 'Accra',
    phoneNumber: '0245462451',
    reference: {
      name: 'Sonya',
      phone: '0537888620',
    },
  },
  {
    id: 12,
    name: 'Sylvain',
    profileImage: '/placeholder.svg',
    categories: ['Cook / Chef'],
    workType: 'Part-time',
    description:
      "We would like to recommend our wonderful chef, Sylvain. He makes excellent French, West African and Euro-American dishes. He cooks for our family twice a week, and we couldn't be happier—not only with the quality of his food but also with the warmth and calm presence he brings into our home. He is kind, clean, honest, and wonderful with children. We feel very fortunate to have him working with us! Sylvain has recently become available to cook for another family twice a week. He speaks fluent French and decent English and follows any recipe with ease. Some of his specialties include delicious salads, pizzas, quiches, lasagnas, and more.",
    location: 'Accra',
    phoneNumber: '0267770679',
    reference: {
      name: 'Sophie',
      whatsapp: 'Sophie',
    },
  },
  {
    id: 13,
    name: 'Abigail',
    profileImage: '/placeholder.svg',
    categories: ['Housekeeper', 'Nanny'],
    workType: 'Full-time',
    description:
      "We would like to warmly recommend Abigail, who has been helping our family for the past year and a half in Accra. She is honest, reliable, and hardworking. Abigail always follows instructions carefully and completes every task with great attention to detail. She learns quickly—once something is explained, she remembers and performs it perfectly from then on. When I work from home, she is quiet and respectful of my space, yet she always communicates well when something needs to be discussed. She also took care of our daughter during school holidays. Thanks to Abigail's cheerful personality, our daughter always enjoyed her time with her. We have trusted Abigail not only with cleaning but also with taking care of our home during our absence for several weeks, and she has never disappointed us. She has truly become part of our family. As we are now leaving Ghana, we sincerely hope she will find another good family to work with. 32yrs, she worked in Airport Area, Spintex, and Cantonments.",
    location: 'Accra (Airport Area, Spintex, Cantonments)',
    phoneNumber: '0505416927',
    reference: {
      name: 'Minami',
      whatsapp: 'Minami',
    },
  },
  {
    id: 14,
    name: 'Martine',
    profileImage: '/placeholder.svg',
    categories: ['Housekeeper'],
    workType: 'Full-time',
    description:
      "We would like to recommend our household help Martine: looking for a live-in position from January 2026 onwards in a French-speaking expat family or single household. Martine was a great support to my husband and me, taking care of our 2–3-year-old daughter during our stay in Accra. She kept the apartment clean, washed our clothes, prepared daily lunchboxes and occasionally dinner. She kept the kitchen always clean. When travelling, she took care of our cat. She is a trustworthy and loyal, warmhearted woman from Togo, who we recommend for any housekeeping or childcare position. Please don't hesitate to reach out for more information.",
    location: 'Accra',
    phoneNumber: '0536376944',
    reference: {
      name: 'Sarah',
      whatsapp: 'Sarah',
    },
  },
  {
    id: 15,
    name: 'Eunice Viala',
    profileImage: '/placeholder.svg',
    categories: ['Housekeeper', 'Cleaner'],
    workType: 'Part-time',
    description:
      "Eunice has worked for us since May 2023 and we are very satisfied with her services. I fully support the positive reference provided by her previous employer, emphasizing that Eunice is warm, hardworking, meticulous, and very reliable. She comes with years of experience working for expat families, among others the Embassy of Netherlands. Eunice is an expert cleaner, irons very well, and is very reliable. She works thoroughly, is trustworthy, and needs little supervision once standards are set. Eunice is available following her previous employer's moved away and can work in Cantonments, North Ridge, East Legon and nearby areas. Mid-40s, live out – part-time available Tuesdays, Wednesdays and Fridays.",
    location: 'Accra (Cantonments, North Ridge, East Legon)',
    phoneNumber: '0543391440',
    reference: {
      name: 'Cristina',
      whatsapp: 'Cristina',
    },
  },
  {
    id: 16,
    name: 'Erica',
    profileImage: '/placeholder.svg',
    categories: ['Housekeeper', 'Cleaner'],
    workType: 'Full-time',
    description:
      'She is Very helpful gentle and discreet. She works hard and is eager to learn. She will adapt well to any household.',
    location: 'Accra',
    phoneNumber: '0543747825',
    reference: {
      name: 'Clara',
      phone: '0542403253',
    },
  },
  {
    id: 17,
    name: 'Dorcas Akosua',
    profileImage: '/placeholder.svg',
    categories: ['Housekeeper'],
    workType: 'Full-time',
    description:
      'She has been with me for 1.5 years and has proven to be trustworthy, responsible, and excellent at her work. She is in her 40s, mature, and works well without supervision. Her skills include: • Thorough cleaning, ironing, and meal prepping • Cooking a variety of dishes including lasagna, meatballs, vegetable rice, and stews • Shopping for fresh vegetables and groceries at the local market every two weeks • School drop-offs and pick-ups, working efficiently with our driver She is very receptive to feedback and open to learning, which has made her a pleasure to work with. Available 2nd week of Dec, available for either live-in or live-out positions.',
    location: 'Accra',
    phoneNumber: '0553166979',
    reference: {
      name: 'Racheal',
      phone: '0534752500',
    },
  },
  {
    id: 18,
    name: 'Pascal Adzosi',
    profileImage: '/placeholder.svg',
    categories: ['Driver'],
    workType: 'Full-time',
    description:
      "I would like to highly recommend Pascal, who has been with our family for close to 2 years. He has been reliable, punctual, and trustworthy, and has handled all his responsibilities with great care and professionalism. His duties included: • School drop-offs and pick-ups, working closely with our housekeeper • Grocery shopping and errands as needed • Walking and caring for our dog (twice daily walks, feeding, and ensuring fresh water throughout the day) • Keeping the car clean and ensuring it is regularly serviced and well-maintained • Monitoring fuel, oil, water, and mechanical needs, and taking the car to the mechanic when necessary He is flexible with working hours, especially during our children's after-school activities, and has always been on time. He owns a motorbike, which allows him to arrive punctually. He has only taken one short sick leave (4 days due to malaria) and has never absconded work. He is calm, quiet, responsible on the road, and does not drive too fast. He is also open to feedback and easy to work with. He uses Google Maps confidently and stays reachable via WhatsApp, as we provided data for his phone. He will be available for interviews on Saturdays or Sundays, and can be reached directly to arrange a meeting. Available 2nd week of Dec.",
    location: 'Accra',
    phoneNumber: '0532527547',
    reference: {
      name: 'Racheal',
      phone: '0534752500',
    },
  },
  {
    id: 19,
    name: 'Vida Agbovoe',
    profileImage: '/placeholder.svg',
    categories: ['Cook / Chef'],
    workType: 'Part-time',
    description:
      "She has been with our family for the past three months. Our kids prefer home-cooked meals and have really enjoyed her dishes. Vida is calm, reliable, and pleasant to work with. She prepares both local and international meals, bakes, and also makes smoothies. She's open to learning and trying new recipes, including dishes from your home country. She works very well alongside our housekeeper and would be a great addition to any home looking for a skilled and easy going cook. 40yrs, Available 2nd week of Dec, works part-time and is available 3 days a week.",
    location: 'Accra',
    phoneNumber: '0244110596',
    reference: {
      name: 'Racheal',
      phone: '0534752500',
    },
  },
  {
    id: 20,
    name: 'Rose Kodjo',
    profileImage: '/placeholder.svg',
    categories: ['Nanny'],
    workType: 'Full-time',
    description:
      'Auntie Rose has been with us since our arrival, and would have stayed with us for 4 years, but we are now having to leave unexpectedly. She has become an integral part of our family and is tightly bonded to my 2-year-old daughter. She is very gifted with children and has a lot of experience with babies and toddlers. Rose has over 15 years of experience, including with Ambassadors and diplomatic families. She is incredibly patient, warm, and kind, and provides all types of activities and engagement for my daughter including reading, singing, and lots of active time outside. In addition to nanny, Rose can do some light housekeeping as well. She is trustworthy, hardworking, and very flexible about working extra hours when we need her. She is discreet and our live-in situation has been seamless and easy. She speaks English and French fluently. Live in or Live out.',
    location: 'Accra',
    phoneNumber: '0548554350',
    reference: {
      name: 'Leah',
      whatsapp: 'Leah',
    },
  },
  {
    id: 21,
    name: 'Naomi',
    profileImage: '/placeholder.svg',
    categories: ['Cook / Chef'],
    workType: 'Part-time',
    description:
      'I am very pleased to recommend Naomi, who has been my cook for almost a year. She comes once a week and has consistently shown reliability, skill, and warmth in her work. • Naomi prepares healthy, delicious, and well-balanced meals tailored to my needs. • She is always punctual and dependable, arriving on time with great energy and a positive attitude. • When I host guests, Naomi also comes to cook, and my guests are always delighted with her food. • She maintains a positive attitude, good mood, and uplifting energy, which makes working with her a pleasure. • She brings professionalism, consistency, and creativity to the kitchen, making every meal a pleasure. Naomi has been a wonderful support in my home, and I highly recommend her to anyone looking for a skilled and trustworthy cook.',
    location: 'Accra',
    phoneNumber: '0531919283',
    reference: {
      name: 'Jan',
      whatsapp: 'Jan',
    },
  },
  {
    id: 22,
    name: 'Germaine',
    profileImage: '/placeholder.svg',
    categories: ['Nanny', 'Housekeeper'],
    workType: 'Full-time',
    description:
      'She worked for my family for a year and a half, and I highly recommend her. She is reliable, hardworking, and skilled in both cleaning and cooking. She is also very patient with children and took excellent care of our dog. Germaine is looking for a live-out position from Monday to Friday. Any household would lucky to have her. Live out.',
    location: 'Accra',
    phoneNumber: '0531483005',
    reference: {
      name: 'AMINATA DIARRA',
      whatsapp: 'AMINATA DIARRA',
    },
  },
  {
    id: 23,
    name: 'Rebecca',
    profileImage: '/placeholder.svg',
    categories: ['Nanny'],
    workType: 'Full-time',
    description:
      "We have left Ghana after 4 wonderful years and would like to recommend our nanny Rebecca to anyone in need of a nanny. Rebecca has been a caring, reliable and wonderful person to take care of our daughter for the past 2 years. In addition to being primarily in charge of caring for our daughter, she has also been assisting our house help with cleaning, ironing and other household chores as needed. Rebecca is in her mid-30's, a mother of two and is a nurse by training. She has also taken the Basic Emergency First Aid training at WARA. She is available to work Mon-Friday 7 am to 5 pm starting immediately and prefers Cantonments/Labone/Airport areas.",
    location: 'Accra (Cantonments/Labone/Airport)',
    phoneNumber: '0554221502',
    reference: {
      name: 'Cemile',
      whatsapp: 'Cemile',
    },
  },
  {
    id: 24,
    name: 'Pati',
    profileImage: '/placeholder.svg',
    categories: ['Housekeeper'],
    workType: 'Part-time',
    description:
      "I'm here today to talk about our former housekeeper, who is an exceptional person and is now looking for a part time position to complete her full week. She worked with my family for over three years, and we were incredibly fortunate to have her. While she's very good at keeping a home clean and organized, I want to emphasize her remarkable talent for cooking. We used to put ingredients on the table and sent her a YouTube video, and she would create amazing meals from them. She's incredibly resourceful and a quick learner. She masterfully prepared a variety of Belgian and Brazilian dishes for us, even asiatique food and of course a nice Jollof rice. She occasionally helped with our 4-year-old child, but her main focus and expertise are in cleaning and her surprising talent in the kitchen. She is reliable, trustworthy, and professional. She is a dedicated mother to three children, ages 17, 14, and 10. I cannot recommend her highly enough. If you or anyone you know is looking for a fantastic housekeeper who can also surprise you with her cooking skills, please consider her. You would be very lucky to have her. Available in Airport only on Tuesday and Thursdays.",
    location: 'Accra (Airport area)',
    phoneNumber: '0555057963',
    reference: {
      name: 'Isa',
      whatsapp: 'Isa',
    },
  },
  {
    id: 25,
    name: 'Emmanuel Nyator',
    profileImage: '/placeholder.svg',
    categories: ['Gardener'],
    workType: 'Full-time',
    description:
      "I am delighted to offer my strongest recommendation for Emmanuel as a gardener and all-around household support professional. He consistently demonstrated exceptional reliability, dedication, and a strong work ethic, who has worked for U.S. Embassy families for over 30 years. He is amazing at cultivating a wide variety of vegetables and flowers with impressive care and attention to detail. He also ensures that the lawn and grounds are meticulously maintained, creating a beautiful, orderly environment that reflects his pride in his work. In addition to his gardening expertise, Emmanuel is extremely versatile and willing to assist with a variety of tasks, including car cleaning, pet care/dog walking and running errands. Emmanuel's can-do attitude, trustworthiness, and consistency make him an invaluable asset to any household. In my three years at post, he stands out as one of the most dependable and trustworthy staff members I have had the pleasure of working with.",
    location: 'Accra',
    phoneNumber: '0242177696',
    reference: {
      name: 'Rosen Kimberly',
      email: 'rosen_kimberly@hotmail.com',
    },
  },
  {
    id: 26,
    name: 'Jonathan Avutsey',
    profileImage: '/placeholder.svg',
    categories: ['Gardener'],
    workType: 'Full-time',
    description:
      'I am very pleased to offer my highest recommendation for Jonathan Avutsey as a gardener and overall household support professional. During the time he has worked with me, Jonathan has consistently demonstrated exceptional reliability, a strong work ethic, and a proactive approach to everything he does. He has kept my lawn impeccably maintained, always ensuring that the outdoor areas are clean, tidy, and well-cared-for. Jonathan has a talent for gardening—he not only maintains existing plants with care, but also has an impressive ability to grow both vegetables and flowers. Beyond gardening, Jonathan is very versatile and willing to help with a wide range of household tasks. He has assisted with car cleaning, pet care, and running errands. He is unfailingly polite, trustworthy, and dependable, and I have complete confidence in him whether he is working independently or handling sensitive responsibilities.',
    location: 'Accra',
    phoneNumber: '0243201229',
    reference: {
      name: 'Rosen Kimberly',
      email: 'rosen_kimberly@hotmail.com',
    },
  },
  {
    id: 27,
    name: 'Hilda Atakpa',
    profileImage: '/placeholder.svg',
    categories: ['Housekeeper'],
    workType: 'Full-time',
    description:
      'I am very pleased to offer my highest recommendation for Hilda as a housekeeper. Over the past three years, Hilda has consistently demonstrated an exceptional level of reliability, dedication, and attention to detail. I have a fairly large home, and maintaining it to a high standard is no small task. Hilda handles this challenge, ensuring that every room is consistently spotless, organized, and sanitary. From routine cleanings to deep cleaning projects, she approaches every task with thoroughness. Hilda takes direction thoughtfully while also showing initiative. She has come to understand my preferences and household routines, and makes sure that everything is completed. Beyond her work ethic, Hilda is trustworthy and respectful. If you are looking for someone hardworking and dependable, I recommend Hilda Atakpa.',
    location: 'Accra',
    phoneNumber: '0507308343',
    reference: {
      name: 'Kimberly Rosen',
      whatsapp: 'Kimberly Rosen',
      email: 'rosen_kimberly@hotmail.com',
    },
  },
  {
    id: 28,
    name: 'Mary Khan',
    profileImage: '/placeholder.svg',
    categories: ['Housekeeper', 'Cleaner'],
    workType: 'Part-time',
    description:
      'Mary has worked for us since May, and we are very satisfied with her services. I fully support the positive reference provided by her previous employer, emphasizing that Mary is warm, hardworking, meticulous, and very reliable. Although she has been with us for just four months, she comes with years of experience working for expat families, among others the British High Commission. Mary is an expert cleaner, irons very well, and can also prep and cook Ghanaian dishes (we have not required her to cook for us). She works thoroughly, is trustworthy, and needs little supervision once standards are set. Mary is available following her previous employers moved back to the UK and can work in Cantonments, North Ridge, East Legon and nearby areas. Mid-40s, live out – part-time available Mondays and Thursdays.',
    location: 'Accra (Cantonments, North Ridge, East Legon)',
    phoneNumber: '0240868625',
    reference: {
      name: 'Chantelle',
      phone: '0257768500',
      whatsapp: 'Chantelle',
    },
  },
  {
    id: 29,
    name: 'Agnes Engmann',
    profileImage: '/placeholder.svg',
    categories: ['Housekeeper', 'Nanny'],
    workType: 'Full-time',
    description:
      'She is a nanny, housekeeper, pet-sitter, cook, and general home manager. She has worked for our family for the last 1.5 years, and before that, worked for our neighbor, an expatriate family from the Netherlands. Agnes has a pleasant smile and will make your children feel loved. She is a diligent cook and cleaner.',
    location: 'Accra',
    phoneNumber: '0244701709',
    reference: {
      name: 'Queen',
      phone: '0241390233',
    },
  },
  {
    id: 30,
    name: 'Gina',
    profileImage: '/placeholder.svg',
    categories: ['Cleaner'],
    workType: 'Part-time',
    description:
      "She was my sister's cleaner and worked with her for 2years. She's very honest and hardworking. Part time only Weekends. Live out or live-in.",
    location: 'Accra',
    phoneNumber: '0247196917',
    reference: {
      name: 'Belinda',
      phone: '0506364701',
    },
  },
  {
    id: 31,
    name: 'Louisa K.',
    profileImage: '/placeholder.svg',
    categories: ['Housekeeper'],
    workType: 'Part-time',
    description:
      "Louisa has been working for us for almost 4 years full time. She is kind, friendly and proactive. She's been a great housekeeper and more than willing to help in the toughest tasks. Aside from doing the laundry, the dishes and cleaning the house, she helps clean our air conditioners, takes care of our cat, and assists us with projects around the house. She's a hard worker and stays until the work is done. She's also taken care of our early teen children when we were out of town and has previous experience caring for younger children. She cooks light meals and assists with food prep when necessary. She assists us when we have parties and dinner guests. She has been indispensable to us. You won't be disappointed! Part time – 2days a week.",
    location: 'Accra',
    phoneNumber: '0591445508',
    reference: {
      name: 'Maureen',
      whatsapp: 'Maureen',
      email: 'maxforza@aol.com',
    },
  },
  {
    id: 32,
    name: 'Chef Honoré',
    profileImage: '/placeholder.svg',
    categories: ['Cook / Chef'],
    workType: 'Part-time',
    description:
      "I would like to recommend Chef Honoré, who has been doing meal prep for us for the past year. He came every Tuesday in East Legon. Chef Honoré helped me plan weekly menus and was also able to improvise creatively with what was available in the pantry or fridge. I usually did the groceries beforehand, and he handled the cooking with ease. He is calm, super nice, and efficient. Open to feedback and willing to adapt recipes to suit kids' preferences. Always punctual and very trustworthy. He cooks Continental / European/Togolese / Beninese dishes. Tuesdays and Thursdays, Extra sessions on weekends.",
    location: 'Accra (East Legon)',
    phoneNumber: '0541279929',
    reference: {
      name: 'Ahouéfa',
      phone: '0257956696',
    },
  },
  {
    id: 33,
    name: 'Soussou Nourou',
    profileImage: '/placeholder.svg',
    categories: ['Cook / Chef'],
    workType: 'Full-time',
    description:
      'He is Togolese and very professional; he served as a Chef with Newco Catering & Logistics from May 2023 to November 2024. Throughout his tenure, Mr. Nourou consistently demonstrated calm professionalism, exceptional culinary skills, and a commitment to excellence. His ability to prepare and serve nutritious, flavorful meals was regularly appreciated by both clients and colleagues alike. At Newco Catering & Logistics, we place a high value on diligence and professionalism, and Mr. Nourou continually exemplified these qualities. His reliable work ethic and positive attitude made him a valued member of our team. I would gladly consider Mr. Nourou for future employment opportunities, and I am confident he would be an asset to any organization seeking a skilled and dedicated culinary professional.',
    location: 'Accra',
    phoneNumber: '0508531205',
    reference: {
      name: 'Bernard Turkson',
      phone: '0244313005',
    },
  },
  {
    id: 34,
    name: 'Godfred Kofi Akorabo',
    profileImage: '/placeholder.svg',
    categories: ['Cook / Chef'],
    workType: 'Full-time',
    description:
      "It is with great pleasure that I recommend Godfred a highly skilled and accomplished chef with over three decades of professional culinary experience in Ghana and across the African continent. Mr. Akorabo's career has taken him through an impressive range of establishments, including luxury hotels, international embassies, corporate institutions, and renowned restaurants. His expertise covers West African, Continental, and international cuisines, and he has consistently demonstrated mastery in menu planning, high-volume kitchen operations, and team leadership. Throughout his career, he has held prestigious positions such as Executive Chef, Head Chef, Senior Sous Chef, and Deputy Head Chef in respected institutions such as Afia Beach Hotel, Crystal Rose Hotel, the American Embassy (Ghana), Stanbic Bank Ghana, and Kata Restaurant, Accra. His ability to deliver exceptional culinary experiences, maintain high food safety standards, and manage diverse kitchen teams makes him an invaluable asset to any organization. Mr. Akorabo is not only a talented chef but also a disciplined, dependable, and passionate professional. His strong work ethic, dedication to excellence, and ability to adapt to multicultural work environments set him apart. I have no hesitation in recommending him for any future culinary role, confident that he will exceed expectations and bring distinction to any establishment he joins.",
    location: 'Accra',
    phoneNumber: '0208296402',
    reference: {
      name: 'Danielle',
      whatsapp: 'Danielle',
    },
  },
  {
    id: 35,
    name: 'Alice Mensah',
    profileImage: '/placeholder.svg',
    categories: ['Cleaner'],
    workType: 'Part-time',
    description:
      "Alice is looking for a part time cleaning role in Cantonments, Ridge, Osu, Labone. She has worked with me previously as a nanny/cleaner. She's great with kids and diligent with her work helping to clean and iron as needed. She takes directions well and can get on with her work independently. She's very trustworthy! She can even cook or prep for cooking if needed. She can cook both continental and local dishes. She has worked for other expat families as well and is an all-round asset to anyone who employs her. I've known Alice for 9 years now and am always happy to help her. She also speaks English and French and Ewe and a bit of Twi. 31yrs.",
    location: 'Accra (Cantonments, Ridge, Osu, Labone)',
    phoneNumber: '0553252433',
    reference: {
      name: 'Shoshana',
      phone: '0207386653',
    },
  },
  {
    id: 36,
    name: 'Rebecca',
    profileImage: '/placeholder.svg',
    categories: ['Cook / Chef'],
    workType: 'Full-time',
    description:
      'I am pleased to write this letter of recommendation for Rebecca, who worked with me as a professional cook. Over the course of her service, she consistently demonstrated exceptional culinary skills, professionalism, and a strong work ethic. Rebecca is highly skilled in preparing both local and continental dishes, and she approaches her work with remarkable precision and care. Her meals were consistently delicious, well-presented, and tailored to the preferences of those she served. With over 20 years of experience, she has cooked for a diverse range of households, including expatriate families and diplomatic missions, and has always done so with excellence. In addition to her culinary expertise, Rebecca is punctual, reliable, and eager to learn. She embraces new techniques and recipes with enthusiasm and continually seeks to improve her skills. Her dedication, humility, and positive attitude make her a pleasure to work with. I have no hesitation in recommending Rebecca for any position that requires a seasoned, trustworthy, and talented cook. She would be an asset to any household or institution.',
    location: 'Accra',
    phoneNumber: '0248528997',
    reference: {
      name: 'Lucille',
      phone: '0593220849',
    },
  },
  {
    id: 37,
    name: 'Shalom',
    profileImage: '/placeholder.svg',
    categories: ['Housekeeper'],
    workType: 'Full-time',
    description:
      'Shalom is looking for a live-out housekeeping position either full-time or a few days a week, She lives in Teshie area and she does cleaning, organizing, and doing laundry, and can also care for children. She speaks English, French, Twi. She is diligent in her work. She has experience working as a housekeeper and nanny for several families. In her 30s, live out, full time or part time.',
    location: 'Accra (Teshie)',
    phoneNumber: '0257041977',
    reference: {
      name: 'Aimee',
      whatsapp: 'Aimee',
    },
  },
  {
    id: 38,
    name: 'Ruth Komong',
    profileImage: '/placeholder.svg',
    categories: ['Nanny', 'Housekeeper'],
    workType: 'Full-time',
    description:
      "I'd like to recommend Ruth, who worked with us as a house help and nanny for nearly 3 years. She was truly a gem to me and my son. Ruth has a big heart and is wonderful with children. She has a baby and an older daughter of her own, so she's experienced with both babies and older kids. She also helped around the house — cleaning, ironing, and cooking local meals. I can honestly recommend her, and I'm happy to share more if needed. Part time or full time & live out.",
    location: 'Accra',
    phoneNumber: '0249710465',
    reference: {
      name: 'Nadja',
      phone: '0206836334',
    },
  },
  {
    id: 39,
    name: 'Gaston Koami Adissou',
    profileImage: '/placeholder.svg',
    categories: ['Cook / Chef'],
    workType: 'Full-time',
    description:
      'Chef Gaston is an experienced Chef and Dietician who has been under my supervision for 1.5 years. He is enthusiastic, timely, and discreet. His extensive experience and professionalism is clear in everything that he does. He is an honest person and a hard worker who truly only wishes to please. I highly recommend him in a private setting and especially for a high-ranking individual who demands only the best. He is a Togolese National and prefers to live in. Hours are flexible; full-time employment is desired. Flexible work hours, prefers live in since his home is in Togo. He can also support some light gardening and property support. No childcare. I have known Adissou Koami (Gaston) as a Togolese national who has worked with our institution, the Accra Regional Analytic Center for Intelligence, as a Profession Cook and Dietitian. He worked from 2019 to May, 2025, distinguishing himself as highly reliable, professional and a good cook. I have no reservations in recommending to serve in your organisations. Please, do not hesitate to contact me for further enquiries when necessary. Based in Togo, prefers Live-in.',
    location: 'Accra',
    phoneNumber: '',
    reference: {
      name: 'Mr. Bukari',
      whatsapp: 'Mr. Bukari',
    },
  },
  {
    id: 40,
    name: 'Samuel',
    profileImage: '/placeholder.svg',
    categories: ['Housekeeper'],
    workType: 'Full-time',
    description:
      "He has been with me for the past 2 years and I can highly recommend him. His main tasks are the daily cleaning of the whole house, taking care of the household and going on errands. He's very organized, reliable, does an exceptional job, respectful, hardworking and has got a pleasant personality. He's currently available from now and looking for a full-time live-in position. 28yrs, worked in Spintex - live in.",
    location: 'Accra (Spintex)',
    phoneNumber: '0247761415',
    reference: {
      name: 'Belinda',
      phone: '0506364701',
    },
  },
  {
    id: 41,
    name: 'Comfort',
    profileImage: '/placeholder.svg',
    categories: ['Cleaner'],
    workType: 'Full-time',
    description:
      'She has worked for several families as a house cleaner and has always done an excellent job. She provided housecleaning and ironing services at our home, and everything was consistently neat and well-organized. We highly recommend her for her reliability and the quality of her work.',
    location: 'Accra',
    phoneNumber: '0552600964',
    reference: {
      name: 'Wilhelm',
      phone: '0257960334',
    },
  },
  {
    id: 42,
    name: 'Josephine Owusu Ansah',
    profileImage: '/placeholder.svg',
    categories: ['Housekeeper'],
    workType: 'Full-time',
    description:
      'She worked with us as a live-in domestic helper for one year. She is reliable, trustworthy, and enjoys cooking—always following recipes well and preparing great meals. Under supervision, she is good following instructions. She became a valued part of our household. We no longer need as much help at home, which is the only reason her time with us ended.',
    location: 'Accra',
    phoneNumber: '0243046785',
    reference: {
      name: 'Mariam',
      whatsapp: 'Mariam',
    },
  },
  {
    id: 43,
    name: 'Bridget',
    profileImage: '/placeholder.svg',
    categories: ['Housekeeper'],
    workType: 'Part-time',
    description:
      'I highly recommend Bridget for anyone looking for a reliable and meticulous housekeeper. She currently works with us on Fridays, and we have been consistently impressed with her exceptional cleaning skills, attention to detail, and professionalism. Bridget is now looking for additional live-out housekeeping work on other days of the week. She is trustworthy, efficient, and always leaves our home spotless. We feel lucky to have her and would gladly recommend her to anyone in need of quality housekeeping. Live out.',
    location: 'Accra',
    phoneNumber: '0594619456',
    reference: {
      name: 'Mariama',
      phone: '0549845172',
    },
  },
  {
    id: 44,
    name: 'Gifty Akosah',
    profileImage: '/placeholder.svg',
    categories: ['Housekeeper'],
    workType: 'Full-time',
    description:
      'Gifty has worked for my family for the past 2yrs as a housekeeper helping with general cleaning, ironing, laundry and anything we asked her to do around the house. She also spent time with our 3 years old son and baby sat him on occasion in the evenings. She always performed her duties well. She has good character and very trustworthy, working hard, punctual, She also helped for looking after the house when we were on Vacation. 48 yrs.',
    location: 'Accra',
    phoneNumber: '0257892802',
    reference: {
      name: 'Brenda',
      phone: '0531355623',
    },
  },
  {
    id: 45,
    name: 'John',
    profileImage: '/placeholder.svg',
    categories: ['Mason'],
    workType: 'Full-time',
    description:
      'John is excellent; out of all the masons I have worked with from 2007, he has been the absolute best. He built a wall at my house. He built a house in North Legon and has worked on many many projects. His work is very neat, level and even. Available immediately.',
    location: 'Accra',
    phoneNumber: '0245090388',
    reference: {
      name: 'Stacey',
      phone: '0273009946',
    },
  },
  {
    id: 46,
    name: 'Bright',
    profileImage: '/placeholder.svg',
    categories: ['Gardener'],
    workType: 'Full-time',
    description:
      "A very knowledgeable and hard working young man. He's very passionate about his work and looking to get more clients. He revived our home after a few months and was able to right away tell what was wrong and a solution to fix the problem with our lawn and plants and everything is thriving now!",
    location: 'Accra',
    phoneNumber: '0555510240',
    reference: {
      name: 'Monalisa',
      phone: '0554709900',
    },
  },
  {
    id: 47,
    name: 'Obodai',
    profileImage: '/placeholder.svg',
    categories: ['Pool Cleaner'],
    workType: 'Part-time',
    description:
      'I would like to recommend Obodai as a pool cleaner. For more than 20 years, he has diligently maintained our pool weekly, ensuring it remains clean. He is hardworking and dedicated. He currently does not have a location preference.',
    location: 'Accra',
    phoneNumber: '0547661316',
    reference: {
      name: 'Farida',
      phone: '0550660169',
    },
  },
  {
    id: 48,
    name: 'Elizabeth',
    profileImage: '/placeholder.svg',
    categories: ['Housekeeper', 'Nanny'],
    workType: 'Part-time',
    description:
      'She has been working part-time for our family for almost 6 months and she is interested in working more hours and could be available for another family on a part-time basis. She is a very kind, pleasant person and loves children. She is diligent and conscientious with her work and has always been very reliable. She is doing cleaning and laundry in our house but in the past has also worked with children and done cooking for European families. She is always a cheerful and pleasant person to be around and is very kind and engaging with our 4-year-old son. 40yrs, ONLY SMS, available in the afternoons in Cantonments or nearby areas.',
    location: 'Accra (Cantonments)',
    phoneNumber: '0247561546',
    reference: {
      name: 'Sarah',
      phone: '0547907989',
    },
  },
  {
    id: 49,
    name: 'Millicent',
    profileImage: '/placeholder.svg',
    categories: ['Nanny'],
    workType: 'Full-time',
    description:
      "Millicent is a kind-hearted and trustworthy nanny with more than 15 years working experience. She is trustworthy, dependable and our kids truly enjoy spending time with her. They loved playing football, board games and building things with her. She worked with us for nearly two years. Circumstances are changing in our house and she is looking for a full-time nanny job (whereas we need someone balance nanny and housecleaning responsibilities). I'm pleased to recommend her. Live out or live in, depending on circumstances.",
    location: 'Accra',
    phoneNumber: '0547280887',
    reference: {
      name: 'Emily',
      whatsapp: 'Emily',
    },
  },
  {
    id: 50,
    name: 'Linda',
    profileImage: '/placeholder.svg',
    categories: ['Nanny'],
    workType: 'Full-time',
    description:
      'If anyone is looking for a nanny, please call Linda. She used to work with me and is looking for a job. Available immediately, live in or live out.',
    location: 'Accra',
    phoneNumber: '0244036579',
    reference: {
      name: 'Leeni',
      whatsapp: 'Leeni',
    },
  },
  {
    id: 51,
    name: 'Baba',
    profileImage: '/placeholder.svg',
    categories: ['Gardener'],
    workType: 'Part-time',
    description:
      'Baba has been looking after our garden for almost a year and our plants have never been happier. He comes to our place twice a month (Saturdays, Cantonments) and currently has a lot of other days available for full time or part time work. Available immediately.',
    location: 'Accra (Cantonments)',
    phoneNumber: '0592883209',
    reference: {
      name: 'Tania',
      whatsapp: 'Tania',
    },
  },
  {
    id: 52,
    name: 'Ruth',
    profileImage: '/placeholder.svg',
    categories: ['Housekeeper', 'Cook / Chef', 'Nanny'],
    workType: 'Full-time',
    description:
      "Ruth came to us last year in September as a cook. She was not a great cook so we let her go. But I needed help in the kitchen and generally so we asked her to come back and she agreed. Ruth is working on her cooking skills and has improved a lot. She can bake a bit as well. She has my recipe book and is good at following recipes but sometimes needs help. However, she is a great helper in the kitchen and around the house. She keeps the kitchen spotless at all times. She is great with our daughters (8 and 3 years old) and can engage them with activities in a creative way. She is eager to please so I'm sure she will do well in what she sets her mind to. I would like to recommend Ruth and trust she will be a good fit in any household. 36 yrs, prefers Cantonements/Labone.",
    location: 'Accra (Cantonments/Labone)',
    phoneNumber: '0547656934',
    reference: {
      name: 'Tanya',
      phone: '0556611394',
    },
  },
  {
    id: 53,
    name: 'Ladidi',
    profileImage: '/placeholder.svg',
    categories: ['Housekeeper', 'Cook / Chef'],
    workType: 'Part-time',
    description:
      'She has been working for us for the past year, previously working as the security manager in our building. She works part time (2 days per week) for us and is going to massage therapy school two mornings per week. She is very hard working and after having three cleaners in Ghana already, she is by far the best we have had. She is thorough and a self-starter, always going above and beyond what we ask her to do. She has also started cooking for us, making both Ghanaian and international dishes and doing meal preparation for lunches. She is completely trustworthy; we have left her in our apartment for up to three weeks on her own several times and she took very good care of it. She is looking for work for 1 or 2 days extra per week and would travel from Cantonments. 20yrs.',
    location: 'Accra (Cantonments)',
    phoneNumber: '0545388310',
    reference: {
      name: 'Shea',
      phone: '0593899955',
    },
  },
  {
    id: 54,
    name: 'Bernard',
    profileImage: '/placeholder.svg',
    categories: ['Photographer'],
    workType: 'Part-time',
    description:
      "If you're looking for a reliable, talented, and professional photographer, I would wholeheartedly recommend Bernard. He has captured countless special moments through his lens – from birthday parties and weddings to corporate and community events. Bernard comes fully equipped with his own high-quality camera and works alongside an experienced videographer, which means you save on rental costs too! I've personally seen his work and can vouch for his professionalism, creativity, and dedication to delivering high-quality photos and videos. He's punctual, easy to work with, and truly passionate about what he does. Whether you're planning a family celebration or a big event, you can count on Bernard to beautifully capture every moment.",
    location: 'Accra',
    phoneNumber: '0243177240',
    reference: {
      name: 'Alipt',
      phone: '0242100621',
    },
  },
  {
    id: 55,
    name: 'Rebecca',
    profileImage: '/placeholder.svg',
    categories: ['Nanny'],
    workType: 'Full-time',
    description:
      'She covered an absence, as my nanny needed to travel. She helped with my two toddlers and with minor things around the house. She can cook but did not cook for my family. She has studied midwifery and has some experience of teaching in a primary school. I met her through another teacher, not this platform. She lives in Oyarifa so would prefer live-in Monday -Friday. 26 yrs, Live-in.',
    location: 'Accra',
    phoneNumber: '0533441101',
    reference: {
      name: 'Jas',
      phone: '0200309070',
    },
  },
  {
    id: 56,
    name: 'Delphine',
    profileImage: '/placeholder.svg',
    categories: ['Nanny', 'Housekeeper'],
    workType: 'Part-time',
    description:
      'I would like to recommend Delphine as a Nanny / Housekeeper. She is looking for a part-time position. She is Francophone and Anglophone. She took care of our two children for two years. She is caring, attentive and plays well with the children. She also cleans and tidies diligently. She would also cook at times. She is looking for a live out position. Live-out.',
    location: 'Accra',
    phoneNumber: '0557118703',
    reference: {
      name: 'Aimee',
      whatsapp: 'Aimee',
    },
  },
  {
    id: 57,
    name: 'Ibrahim',
    profileImage: '/placeholder.svg',
    categories: ['Driver'],
    workType: 'Full-time',
    description:
      "Ibrahim has worked for my family for a close to four (4) years as a driver. Prior to this, he also worked over 11 years with various families, coupled with another 15 years of professional driving of commercial vehicles. Mr. Ibrahim is a calm, very skilled and trustworthy driver who always drives safely, knows the roads well, is extremely reliable, always punctual, and someone we've trusted completely with school drop-offs and pick-ups for our children. We feel truly fortunate to have had such a wonderful driver, and we sincerely recommend him.",
    location: 'Accra',
    phoneNumber: '0244691695',
    reference: {
      name: 'Kaz',
      whatsapp: 'Kaz',
    },
  },
  {
    id: 58,
    name: 'Merceline',
    profileImage: '/placeholder.svg',
    categories: ['Cook / Chef'],
    workType: 'Part-time',
    description:
      "I would like to highly recommend Merceline. She has been working with us part time for a little over 3 years now and is available to take on more hours. She's a great cook and is really quick to learn new recipes or happy to experiment as well. She's great at Ghanaian cuisine and some Indian and continental dishes. She's available Monday-Friday 2-6pm. She's an invaluable asset to any family. Part time cook.",
    location: 'Accra',
    phoneNumber: '0554432869',
    reference: {
      name: 'Shoshana',
      phone: '0207386653',
    },
  },
  {
    id: 59,
    name: 'Jesse Amoah',
    profileImage: '/placeholder.svg',
    categories: ['Driver'],
    workType: 'Full-time',
    description:
      'I would like to recommend our former driver who is available at the moment. Please feel free to reach out for the recommendation letter or any clarification. Area: Accra(Airport, Cantonments)',
    location: 'Accra (Airport, Cantonments)',
    phoneNumber: '0248360934',
    reference: {
      name: 'Fernanda',
      phone: '0202019719',
    },
  },
  {
    id: 60,
    name: 'Eunice',
    profileImage: '/placeholder.svg',
    categories: ['Housekeeper', 'Nanny'],
    workType: 'Full-time',
    description:
      'Eunice has watched our daughter full time for the past two years, starting when she was 6 months old. She also has experience with older and younger children. She has even trained in first aid and cpr by the US embassy. She is a wonderful caretaker and our daughter thinks of her as family. She also does all things around the house- cleans, laundry, meal prep and errands when I ask. She stays at our house and watches our dog when we are out of town. She is trustworthy and reliable. Prefers Live-out around Cantonments.',
    location: 'Accra (Cantonments)',
    phoneNumber: '0243949124',
    reference: {
      name: 'Erin',
      whatsapp: 'Erin',
    },
  },
  {
    id: 61,
    name: 'Anas',
    profileImage: '/placeholder.svg',
    categories: ['Driver'],
    workType: 'Full-time',
    description:
      'Anas has worked for my family for just over a year as a driver. He was responsible for driving the kids to and from school and other activities, running errands with the nanny, doing errands for me, refuelling and cleaning/maintaining the car. He is extremely reliable and honest. He was flexible on working weekends and staying later with advanced notice. He was always on time (preferring to come early). I strongly recommend him.',
    location: 'Accra',
    phoneNumber: '0592104488',
    reference: {
      name: 'Wambui Boulch',
      whatsapp: 'Wambui Boulch',
    },
  },
  {
    id: 62,
    name: 'Gloria',
    profileImage: '/placeholder.svg',
    categories: ['Housekeeper'],
    workType: 'Full-time',
    description:
      'Gloria, very reliable, modest, friendly and hardworking person is looking for a new job. She has been working for international staff for more than 10 years. I can strongly recommend her.',
    location: 'Accra',
    phoneNumber: '0541208970',
    reference: {
      name: 'Magdalena',
      whatsapp: 'Magdalena',
    },
  },
  {
    id: 63,
    name: 'Augustin',
    profileImage: '/placeholder.svg',
    categories: ['Security'],
    workType: 'Full-time',
    description:
      "Augustin has been working for 3 years for foreigners' families as a security guard. Pleasant, always on time, dedicated to his work, he has been helpful with house related maintenance (checking of level of tanks, units on electricity meter, management of visitor workers...). He is comfortable with dogs and will always be a happy face to turn to while coming back home. 29 years - preferably Dzorwulu, Airport residential, Cantonments. Night guard Only.",
    location: 'Accra (Dzorwulu, Airport residential, Cantonments)',
    phoneNumber: '0530191767',
    reference: {
      name: 'Vanessa',
      phone: '0503562692',
    },
  },
  {
    id: 64,
    name: 'Antoine',
    profileImage: '/placeholder.svg',
    categories: ['Cook / Chef'],
    workType: 'Full-time',
    description:
      "He has been our cook for nearly 3 years. Beninese, he knows the classics of French and family cooking. He was in charge of daily meals, family dinners and children's snacks. He was also on duty when we had dinner parties or small cocktail parties. Antoine is willing to help with household chores if needed, to complement his full-time schedule. He's flexible, very flexible with his hours and always willing to do extras. And very jovial with the children, whose snacks he used to supervise on his way home from school!",
    location: 'Accra',
    phoneNumber: '0531937284',
    reference: {
      name: 'Julie Hellemann',
      phone: '0548935715',
    },
  },
  {
    id: 65,
    name: 'Stephen',
    profileImage: '/placeholder.svg',
    categories: ['Security'],
    workType: 'Full-time',
    description:
      'He is a serious and reliable young Ghanaian is looking for a job as a security guy.',
    location: 'Accra',
    phoneNumber: '0247566391',
    reference: {
      name: 'Elias Ghanem',
      phone: '0245984724',
    },
  },
  {
    id: 66,
    name: 'Christiana Asiedu',
    profileImage: '/placeholder.svg',
    categories: ['Cleaner'],
    workType: 'Part-time',
    description:
      'She can do both house cleaning and washing, she is very hardworking and diligent, speaks and understands English. Always punctual. Live out, Monday to Thursdays.',
    location: 'Accra',
    phoneNumber: '0594476409',
    reference: {
      name: 'Keita',
      whatsapp: 'Keita',
    },
  },
  {
    id: 67,
    name: 'Vera',
    profileImage: '/placeholder.svg',
    categories: ['Housekeeper'],
    workType: 'Full-time',
    description:
      'Vera worked for 5 years for Mr and Mrs Nukudah, until they moved to Mexico. Vera is a very lovely lady. She is good at ironing and doing almost every household task. She is looking for live-out employment Mo-Fr. 37yrs, 10 yrs of work experience.',
    location: 'Accra',
    phoneNumber: '0546022435',
    reference: {
      name: 'Nukudah',
      phone: '0541279341',
    },
  },
  {
    id: 68,
    name: 'Emma',
    profileImage: '/placeholder.svg',
    categories: ['Driver'],
    workType: 'Full-time',
    description:
      'I would like to highly recommend my driver, Emma. He is a very exceptional human resource. He is honest, kind, very Street smart, yet careful and meticulous. He does his job with extraordinary diligence and always uses his initiative. He always does the right thing without being told what to do. He is Punctual, Hardworking and never late. Any company who hires him will be so lucky, and I can confidently say he is indeed a rare gem. Driver for Companies (only).',
    location: 'Accra',
    phoneNumber: '0202260781',
    reference: {
      name: 'Tee',
      phone: '0200617781',
    },
  },
  {
    id: 69,
    name: 'Emmanuel Appiah',
    profileImage: '/placeholder.svg',
    categories: ['Driver'],
    workType: 'Full-time',
    description:
      'He is an experienced driver who has worked for expats as a professional work driver. He is also a qualified mechanic and driving instructor. (He knows everything about cars). He is available for work - driving or instructing. Driving work 8am-5pm (Mon-Fri) open to doing paid overtime. Lives in Amasaman. Driver & Mechanic & Driving instructor.',
    location: 'Accra (Amasaman)',
    phoneNumber: '0205300203',
    reference: {
      name: 'Venus',
      phone: '0502911746',
    },
  },
  {
    id: 70,
    name: 'Gladys Tetteh',
    profileImage: '/placeholder.svg',
    categories: ['Housekeeper'],
    workType: 'Full-time',
    description:
      'Gladys only worked for us for 1 month, until we had to unfortunately let her go. She is a very lovely lady, having worked for a family in Accra for the last 30 years. She is trustworthy, patient and understanding. She is good at ironing and doing almost every household task. But as we travel very frequently, we were looking for someone who could manage the house without supervision. Gladys only has one challenge, which is to handle tasks that require writing and reading - making the grocery list for example or running errands. She will fit in a household with multiple help probably or a family who can supervise or manage such tasks on their own. 50yrs, 30 yrs of work experience.',
    location: 'Accra',
    phoneNumber: '0244610481',
    reference: {
      name: 'Prerna',
      phone: '0266623772',
    },
  },
  {
    id: 71,
    name: 'Esther Adjei',
    profileImage: '/placeholder.svg',
    categories: ['Cook / Chef', 'Housekeeper'],
    workType: 'Full-time',
    description:
      'Esther worked as a cook and housekeeper for two years. She has done a cooking course. For now, she is interested in working as a live out as a housekeeper or cook. She can cook a variety of foods, including Continental and African food. She lives in Amasaman, Accra.',
    location: 'Accra (Amasaman)',
    phoneNumber: '0505344195',
    reference: {
      name: 'Maye',
      whatsapp: 'Maye',
    },
  },
  {
    id: 72,
    name: 'James Agbessi',
    profileImage: '/placeholder.svg',
    categories: ['Cook / Chef'],
    workType: 'Full-time',
    description:
      'I would like to recommend my chef. I have known him for over 5 years. He has 33 years of culinary expertise, including roles as a personal and head chef. Having served as the head chef for the Ghana High Commission in Malta and worked independently for numerous clients, he brings a wealth of experience. He can cook European dishes including French and Italian cuisine & local dishes. Available for both part-time and full-time positions (live out). Chef.',
    location: 'Accra',
    phoneNumber: '0553090210',
    reference: {
      name: 'Mizzy',
      whatsapp: 'Mizzy',
    },
  },
  {
    id: 73,
    name: 'Christy',
    profileImage: '/placeholder.svg',
    categories: ['Nanny'],
    workType: 'Part-time',
    description:
      "I've had Christy as nanny for my 14-month-old daughter for a temporary period and now time has come and Christy is back available and looking for a new job. Christy is incredibly caring and trustworthy. She speaks English and French so is perfect for anyone looking to raise bilingual kids. She's creative, fun, and cooks yummy food for kids. She's flexible at working evenings and weekends when needed. Any family would be lucky to have her. Feel free to reach out to her directly. 45yrs, live-out, part time or baby sitting/on demand.",
    location: 'Accra',
    phoneNumber: '0545933254',
    reference: {
      name: 'Arianna',
      whatsapp: 'Arianna',
    },
  },
  {
    id: 74,
    name: 'Irene Adzisu',
    profileImage: '/placeholder.svg',
    categories: ['Housekeeper', 'Cleaner'],
    workType: 'Part-time',
    description:
      'Irene can work in Airport, Madina Adenta area, Cantonments and East legon. She has 6 years of experience and has been an incredible support to my family. Diligent, hardworking, warm and extremely organised, she always worked hard and I would strongly recommend her. We moved to Ghana with a little baby, and Irene helped with the transition by organising our stuff and keeping the house in order; we are so grateful. She always goes the extra mile, such as when helping prepare for visitor arrivals, and organising our shelves. She made our house warm and beautiful! Live out, part time. House Help/ Cleaner.',
    location: 'Accra (Airport, Madina Adenta, Cantonments, East Legon)',
    phoneNumber: '0547761810',
    reference: {
      name: 'Cat',
      phone: '0559636965',
    },
  },
  {
    id: 75,
    name: 'Mary Oyintey',
    profileImage: '/placeholder.svg',
    categories: ['Nanny'],
    workType: 'Full-time',
    description:
      "She was our nanny when we came to Ghana for our holidays. She was extremely helpful, good with kids, punctual and trustworthy. She's hardworking, dedicated, loyal and respectful, She is available for live out employment. Areas: Cantonment/Labone/Spintex/Airport and Dzorwulu. 25 yrs and 3yrs experience Mon-Fri as LIVE-out.",
    location: 'Accra (Cantonments/Labone/Spintex/Airport/Dzorwulu)',
    phoneNumber: '0555771815',
    reference: {
      name: 'Reference',
      phone: '+15712680769',
    },
  },
  {
    id: 76,
    name: 'Josephine Larbi',
    profileImage: '/placeholder.svg',
    categories: ['Qualified Midwife'],
    workType: 'Full-time',
    description:
      "Josephine is a qualified midwife with 10 years of clinical experience. She has worked with me twice as a live in carer for my newborns. I chose to use a midwife because I wanted a professional that has been trained in the care of babies that I could depend on. She takes care of baby baths and changes, laundry, keeping the baby's things separate and well organised, feeding, general care and she is extremely helpful with overnight care. Because of her clinical experience, she is excellent at providing support with feeding, cord care/ circumcision care, assisting with recovery, and any health and wellness concerns you may have. In my experience, she integrates well with other home staff and makes an otherwise stressful newborn stage a lot more manageable. She is also excellent at training nannies. She's looking to providing home care services to any new moms.",
    location: 'Accra',
    phoneNumber: '0244967267',
    reference: {
      name: 'Adwoa',
      phone: '0202355576',
    },
  },
  {
    id: 77,
    name: 'Theresa Dugan',
    profileImage: '/placeholder.svg',
    categories: ['Caretaker / Nanny', 'Nanny'],
    workType: 'Full-time',
    description:
      'She is an excellent caretaker and nanny (if you ever need her to watch kids). Her name is Theresa, she is 46 years old and lives in Kasoa, so can very much be in live in staff.',
    location: 'Accra (Kasoa)',
    phoneNumber: '0246607015',
    reference: {
      name: 'Celine',
      phone: '0595351549',
    },
  },
  {
    id: 78,
    name: 'Eric',
    profileImage: '/placeholder.svg',
    categories: ['French Teacher'],
    workType: 'Part-time',
    description:
      "If you are looking for a French teacher for yourself, he would be the one! He's from Congo but lives in Ghana for long. He has excellent teaching skills and organizes, and very patient. He's coming with his teaching kit such as his laptop and small white boards for break it down for the explanations. He always prepares the reviews for what we learned from last session and help me solidify them. He is very careful with the small details and week points, so it was helpful. I took his lesson for nearly 8 months and I'm ready for the French diploma \"DELF\". French teacher for adults. 33yrs.",
    location: 'Accra',
    phoneNumber: '0508811144',
    reference: {
      name: 'Sachika',
      whatsapp: 'Sachika',
    },
  },
  {
    id: 79,
    name: 'Gladys',
    profileImage: '/placeholder.svg',
    categories: ['Cleaner'],
    workType: 'Full-time',
    description:
      'She was with me 5days a week doing general cleaning, laundry and ironing. She is quiet and trustworthy, and a very sweet and kid friendly person herself. She was always on time and did her work autonomously without needing to be guided all the time. She is a wonderful house help to someone, and I hope she will be treated kindly by her next boss. Live-out.',
    location: 'Accra',
    phoneNumber: '0242532835',
    reference: {
      name: 'Leeni',
      whatsapp: 'Leeni',
    },
  },
  {
    id: 80,
    name: 'Mariam',
    profileImage: '/placeholder.svg',
    categories: ['Cook / Chef', 'Housekeeper'],
    workType: 'Full-time',
    description:
      "I want to recommend Mariam who has worked with me for 2.5 years as an all round cook and house manager. She's brilliant and is only leaving to pursue her love for cooking. She's soft spoken, a happy human and my kids adored her. Saturdays were homemade pizza days, and can even cater for small parties or guest. She's taking additional classes to perfect her skill but she literally makes stuff we send her from instagram and they taste so good. I made the portfolio for her from stuff she's made in house. She will create the menu, shop for the things required and can self-manage! Cook and House Manager.",
    location: 'Accra',
    phoneNumber: '0554773928',
    reference: {
      name: 'Asha',
      whatsapp: 'Asha',
    },
  },
  {
    id: 81,
    name: 'Anthony Dogbey',
    profileImage: '/placeholder.svg',
    categories: ['Driver', 'Pet Care'],
    workType: 'Part-time',
    description:
      'I highly recommend Anthony Dogbey and his two assistants Philip Asamani and James Dogbey for their wide range of services. Donnie is our full-time (Mon-Fri) driver but is looking for weekend work/odd jobs for himself and his two associates. Donnie is an excellent, careful driver and has also handled our other needs, to include hanging paintings, assembling furniture, gardening, running errands, tour guiding guests, bike repairs, etc. For tasks outside his skillset (house painting, custom carpentry, etc) he acts as our project manager and gets the job done, overseeing the workmanship, coordinating with the vendor, etc. Donnie is extremely trustworthy (has handled large amounts of cash for us), arrives on time and is quick to respond to texts. For example, if you\'re new in town and need a "fixer," he\'d be a fantastic person to hire for the weekend. Pet care/dog walking, Odd jobs, Driving. Immediately for part time/odd jobs.',
    location: 'Accra',
    phoneNumber: '0247682190',
    reference: {
      name: 'Marisa',
      whatsapp: 'Marisa',
      email: 'mpavlovskis@gmail.com',
    },
  },
  {
    id: 82,
    name: 'Isaac Okpoti-Paulo',
    profileImage: '/placeholder.svg',
    categories: ['Piano Teacher'],
    workType: 'Part-time',
    description:
      "Isaac has over 8 years of experience and teaches from age 4 to adults. His studio is behind his house in Roman Ridge but he will come to you as well if you have a keyboard. We only found him about a year ago but I wish we had found him sooner. He is truly gifted in teaching children of all abilities how to play and ENJOY piano. He gives them breaks to move their bodies or get a sip of water, is playful and funny, and keeps them engaged. I wish I could pack him in my suitcase but he has a family. Aged early 30's. Piano Teacher.",
    location: 'Accra (Roman Ridge)',
    phoneNumber: '0249557336',
    reference: {
      name: 'Lindsey Hoyme',
      phone: '0247277535',
    },
  },
  {
    id: 83,
    name: 'Sherri',
    profileImage: '/placeholder.svg',
    categories: ['Cook / Chef'],
    workType: 'Full-time',
    description:
      'Sherri was working for us since April, but our needs have changed so we have had to let her go. Her role: she helped put together our menu for the week, compiled the shopping list, went to the market and prepared 2 meals per day (+ extra meals for the weekend). She is a pleasant lady, is very hygiene-conscious and worked independently with little input needed from me. Available Monday to Friday, live-out. Cook.',
    location: 'Accra',
    phoneNumber: '0248222305',
    reference: {
      name: 'Amanda',
      phone: '0594203334',
    },
  },
  {
    id: 84,
    name: 'Beatrice Kofie',
    profileImage: '/placeholder.svg',
    categories: ['Nanny'],
    workType: 'Full-time',
    description:
      "She's a mother of 4 who has very good experience in taking care of children and she has worked as a nanny for 5 years collectively. She worked in Tema Com 10 as a live in Nanny and she currently resides in Tema Com 2.",
    location: 'Accra (Tema Com 2)',
    phoneNumber: '0246379345',
    reference: {
      name: 'Portia Mireku',
      phone: '0247704659',
    },
  },
  {
    id: 85,
    name: 'Elizabeth',
    profileImage: '/placeholder.svg',
    categories: ['Cleaner'],
    workType: 'Full-time',
    description:
      "Elizabeth currently cleans for a school in her area but it doesn't pay well. She is a kind lady I've spent a lot of time with as I'm helping her grandson with some medical needs. She lives in Pokuase but will accept a live in position that allows her to go home on Friday evenings. 40yrs, Live in or Live Out.",
    location: 'Accra (Pokuase)',
    phoneNumber: '0508464051',
    reference: {
      name: 'Lindsey',
      whatsapp: 'Lindsey',
    },
  },
  {
    id: 86,
    name: 'Raymond',
    profileImage: '/placeholder.svg',
    categories: ['Gardener'],
    workType: 'Part-time',
    description:
      'Raymond is hardworking, diligent and knowledgeable about plants. He comes to ours once a week and is looking for more jobs to increase his income.',
    location: 'Accra',
    phoneNumber: '0241935309',
    reference: {
      name: 'Teye',
      phone: '0556615766',
    },
  },
  {
    id: 87,
    name: 'Dzifa',
    profileImage: '/placeholder.svg',
    categories: ['Housekeeper'],
    workType: 'Full-time',
    description:
      'I recommend Dzifa, she is very friendly, 100% reliable and trustworthy. She is experienced in working for expats with and without children for the last 13 years. She loves pets, especially cats. She likes to bake and cook and it tastes super. House help.',
    location: 'Accra',
    phoneNumber: '0246741599',
    reference: {
      name: 'Cornelia',
      phone: '0591924067',
    },
  },
  {
    id: 88,
    name: 'Rebecca Chegyaire',
    profileImage: '/placeholder.svg',
    categories: ['Cook / Chef'],
    workType: 'Part-time',
    description:
      "She's able to work in any neighborhood, and is looking for 3 days. She has worked as a cook at our home from 8th September 2022 to date. During this time, Rebecca was responsible for preparing shopping lists, buying food supplies from markets and shops as well as cooking meals for the family, including two small children. She is a very capable cook with a wide range of dishes she is able to prepare. Rebecca is also very punctual and has excellent organizational skills in terms of managing the food shopping. She communicates well and is a pleasure to work with. Cook.",
    location: 'Accra',
    phoneNumber: '0248528997',
    reference: {
      name: 'Yas',
      phone: '0558274233',
    },
  },
  {
    id: 89,
    name: 'Mercy',
    profileImage: '/placeholder.svg',
    categories: ['Cleaner'],
    workType: 'Part-time',
    description:
      'She is a hardworking and reliable cleaner, who is looking for extra work on Fridays and Saturdays. She lives in Nima, and ideally prefers to work somewhere central: Airport, Cantonments, Kanda etc.',
    location: 'Accra (Airport, Cantonments, Kanda)',
    phoneNumber: '0554570845',
    reference: {
      name: 'Natalija',
      phone: '0545779937',
    },
  },
  {
    id: 90,
    name: 'Alberta Allotey',
    profileImage: '/placeholder.svg',
    categories: ['Housekeeper'],
    workType: 'Part-time',
    description:
      'Five years of experience as a nursery teacher, certificate in beauty treatment, second-class upper family with three kids. I would like to suggest Alberta as a housekeeper or cleaner. With years of expertise, Alberta is a hardworking and meticulous housekeeper. She works diligently, effectively, politely, and on time. 40 yrs, Mamprobi, only on weekends. HOUSEKEEPER.',
    location: 'Accra (Mamprobi)',
    phoneNumber: '0553545069',
    reference: {
      name: 'Ruby',
      phone: '0200018615',
    },
  },
  {
    id: 91,
    name: 'Fanuel',
    profileImage: '/placeholder.svg',
    categories: ['Cook / Chef'],
    workType: 'Part-time',
    description:
      'Fanuel is a superb chef, classically trained in French cuisine. He also cooks wonderful versions of West African and Euro-American cuisines, and can do special occasions as needed (birthday parties, large dinners with multiple courses). He cooks for our family once a week, and we could not be happier with the quality of his food and, moreover, his presence in our home. Fanuel is kind, communicative, creative, meticulous and passionate about his work. He speaks fluent French and English. It is a testament to his excellence that he tends to work for the same families for years. Fanuel has recently become available on Tuesday afternoons. He can cook up to 3 meals that you can eat throughout the week. Among his many dishes, he makes excellent salads, pizza, quiche, lasagnas, low-sugar pies, cakes and crumbles, tangines, stews, and more. He can work in Airport/ East Legon/ Cantonments. Personal chef. Available for special events ONLY.',
    location: 'Accra (Airport, East Legon, Cantonments)',
    phoneNumber: '0249849591',
    reference: {
      name: 'Robyn',
      whatsapp: 'Robyn',
    },
  },
  {
    id: 92,
    name: 'Christina',
    profileImage: '/placeholder.svg',
    categories: ['Housekeeper'],
    workType: 'Full-time',
    description:
      'I wholeheartedly recommend Christiana Glovar, who has served as a domestic worker in our home for 6 years. Christiana has been reliable, diligent and extremely trustworthy, and has done a good job cleaning, managing cleaning supplies and ironing. She has always been flexible with her schedule to meet our needs and accepted any special cleaning. She is genuinely a very polite and sweet person. I am confident that she will perform her duties diligently. House help.',
    location: 'Accra',
    phoneNumber: '0243025953',
    reference: {
      name: 'Edna Celemin',
      phone: '0545911750',
    },
  },
  {
    id: 93,
    name: 'Alberta Ghunney',
    profileImage: '/placeholder.svg',
    categories: ['Cook / Chef'],
    workType: 'Full-time',
    description:
      "A passionate private chef with a decade worth of experience in Cooking & Baking. Dedicated to crafting unforgettable culinary experiences; with over 10 years' experience in cooking and baking, bring creativity, skill, and a love for food to every dish she creates. Whether it's an intimate dinner party, family dinner, corporate event, she aims to delight taste buds and leave a lasting impression. 39yrs, Live out. Chef/Cook.",
    location: 'Accra',
    phoneNumber: '0202147709',
    reference: {
      name: 'Korkor',
      phone: '0200661755',
    },
  },
  {
    id: 94,
    name: 'Vicki Abiti',
    profileImage: '/placeholder.svg',
    categories: ['Housekeeper'],
    workType: 'Part-time',
    description:
      "I highly recommend our part-time housekeeper Vicky. She also works for another family in our compound on the days that she's not with me. She's a very hard worker, very thorough, honest and reliable. She's super pleasant to be around and is even training our new hire. 31yrs, lives around Lapaz, works in Airport area and Cantonments.",
    location: 'Accra (Airport, Cantonments)',
    phoneNumber: '0544197261',
    reference: {
      name: 'Lindsey',
      phone: '0247277535',
    },
  },
  {
    id: 95,
    name: 'Lizzy Crentsil',
    profileImage: '/placeholder.svg',
    categories: ['Cleaner'],
    workType: 'Full-time',
    description:
      "Lizzy has worked with me in North Ridge for 2 yrs and has been of great help since the birth of my third child 2 yrs ago. You can always tell when Lizzy has been around as the house always looks clean and tidy. She helps with making the children's beds, hanging the clean laundry, and doing some light ironing, on top of cleaning the house/windows. She is also ready to assist with other minor tasks when the need arises. Lizzy works independently and has a calm demeanour. Lizzy has never missed a day of work. My youngest enjoys her company and helping Lizzy with her work. Lizzy is available for work from March, 5 days a week, 8 am to 4 pm as she is also a mother. 38 yrs, Live-out, lives in Labadi. Cleaner.",
    location: 'Accra (North Ridge)',
    phoneNumber: '0592302869',
    reference: {
      name: 'Samira',
      phone: '0544096372',
    },
  },
  {
    id: 96,
    name: 'Austin',
    profileImage: '/placeholder.svg',
    categories: ['Driver'],
    workType: 'Full-time',
    description:
      "Has worked both with adults, children (local and expats) and doing deliveries for customers. Very kind and calm personality. I drive myself around town, but have used him when I've needed a driver and know him through his wife. Experienced driver.",
    location: 'Accra',
    phoneNumber: '0546259832',
    reference: {
      name: 'Beka',
      phone: '0201063596',
    },
  },
  {
    id: 97,
    name: 'Akosua',
    profileImage: '/placeholder.svg',
    categories: ['Housekeeper'],
    workType: 'Part-time',
    description:
      'Akosua has worked for us since January 2023 as a housekeeper, part time. She is working for other families and is looking for a part time job for Monday and Wednesday. Akosua is a hard worker, thorough, honest and reliable. She is a pleasant and friendly person. Monday and Wednesday.',
    location: 'Accra',
    phoneNumber: '0249841907',
    reference: {
      name: 'Isabel',
      whatsapp: 'Isabel',
    },
  },
  {
    id: 98,
    name: 'Justin',
    profileImage: '/placeholder.svg',
    categories: ['Cook / Chef'],
    workType: 'Part-time',
    description:
      "I highly recommend Justin as a personal chef. Justin is an excellent cook and can make a variety of cuisines; continental, local, etc. (I particularly enjoy his Thiéboudieune). He's highly professional, has a willingness to learn and has a very pleasant demeanor. He's cooked for me many times for events i've hosted. Originates from Benin and speaks French and English. He is available 2-3 times per week. Part-time Personal Chef.",
    location: 'Accra',
    phoneNumber: '0240772106',
    reference: {
      name: 'Keva',
      phone: '0209285202',
    },
  },
  {
    id: 99,
    name: 'Karla',
    profileImage: '/placeholder.svg',
    categories: ['Personal Assistant'],
    workType: 'Full-time',
    description:
      "Karla is Bilingual in French and English and has a Diploma in Office Management. She's open to secretarial, personal assistant, or managing an office or large household/staff. Reach out for her certificates/CV if interested. Personal Assistant/Governess.",
    location: 'Accra',
    phoneNumber: '0557911083',
    reference: {
      name: 'Agnes',
      phone: '0271032103',
      whatsapp: 'Agnes',
    },
  },
  {
    id: 100,
    name: 'Kate',
    profileImage: '/placeholder.svg',
    categories: ['Cleaner'],
    workType: 'Part-time',
    description:
      "Kate has been working with my family for almost 3 years, helping to clean and also watching my two daughters from time to time. She has been very flexible with her schedule, but I didn't require her services full time. She would only come for a few hours each morning, from Monday through Friday. She is a very hard worker and seeks to do as much as she can to assist. She has been wonderful with my daughters, and we will sorely miss her when we leave. Available 8am-12pm. Cleaner.",
    location: 'Accra',
    phoneNumber: '0597551509',
    reference: {
      name: 'Kim',
      phone: '0540251039',
    },
  },
  {
    id: 101,
    name: 'Victor',
    profileImage: '/placeholder.svg',
    categories: ['French Teacher'],
    workType: 'Part-time',
    description:
      'I want to recommend victor as a French teacher. He has been teaching my 8 years old and 5 years old kids the past 2 years. Great teacher, extremely patient and love to play with them. Unfortunately, we have to stop our sessions as the kids schedules no longer allow them to add the. French teacher.',
    location: 'Accra',
    phoneNumber: '0579096360',
    reference: {
      name: 'Fatou',
      phone: '0242238366',
    },
  },
  {
    id: 102,
    name: 'Yvonne Gley',
    profileImage: '/placeholder.svg',
    categories: ['Housekeeper'],
    workType: 'Full-time',
    description:
      'Yvonne worked for us as a housekeeper. She was always dependable and honest. She cleaned for us full time and watched the kids as needed (infant and 4/5 at the time). She has a background with expats as well as agency work. Available: Mon-Fri, Immediately, live out, lives in Sowutum.',
    location: 'Accra (Sowutum)',
    phoneNumber: '0272196630',
    reference: {
      name: 'Chinita',
      whatsapp: 'Chinita',
    },
  },
  {
    id: 103,
    name: 'Juliet',
    profileImage: '/placeholder.svg',
    categories: ['Housekeeper', 'Nanny'],
    workType: 'Full-time',
    description: 'Housekeeper/nanny. Live in/out.',
    location: 'Accra',
    phoneNumber: '0243922720',
    reference: {
      name: 'Olivia',
      whatsapp: 'Olivia',
    },
  },
  {
    id: 104,
    name: 'Mawusi',
    profileImage: '/placeholder.svg',
    categories: ['Cleaner'],
    workType: 'Part-time',
    description:
      'Mawusi cleaned for my predecessor once a week for 4 years and before that for another international staff. She was always reliable and thorough. We could not retain her as we needed more extensive support. She is available several days a week, her hours are flexible. She used to work in Cantonments.',
    location: 'Accra (Cantonments)',
    phoneNumber: '0275702377',
    reference: {
      name: 'Eva',
      phone: '0599404901',
    },
  },
  {
    id: 105,
    name: 'Mercy',
    profileImage: '/placeholder.svg',
    categories: ['Washing Lady'],
    workType: 'Part-time',
    description:
      'I would like to recommend Mercy. She has been helping with laundry (handwashing) for over a year now. She does her work diligently but is not the best with scheduling (she will come on a Thursday even though asked to come on a Tuesday). My needs has changed, I have a machine now. Mercy is live out and can work as many days as needed. She speaks Ga and Twi only. Mercy lives in Lartehbiokoshie. Washing Lady.',
    location: 'Accra (Lartehbiokoshie)',
    phoneNumber: '0270942905',
    reference: {
      name: 'Agnes',
      whatsapp: 'Agnes',
    },
  },
];

// Extract all unique categories from services
export function getAllCategories(): string[] {
  const categorySet = new Set<string>();
  services.forEach((service) => {
    service.categories.forEach((category) => {
      categorySet.add(category);
    });
  });
  return Array.from(categorySet).sort();
}
