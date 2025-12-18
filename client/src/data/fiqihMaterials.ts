export interface FiqihTopic {
  id: string;
  title: string;
  description: string;
  content: string;
  quranDalil: {
    ayah: string;
    surah: string;
    number: string;
    translation: string;
  }[];
  hadithDalil: {
    text: string;
    source: string;
    narrator: string;
  }[];
  practicalExample?: string;
}

export interface FiqihCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  topics: FiqihTopic[];
}

export const fiqihCategories: FiqihCategory[] = [
  {
    id: "ibadah",
    title: "Fiqih Ibadah",
    description: "Hukum-hukum yang berkaitan dengan ibadah ritual seperti shalat, puasa, zakat, dan haji",
    icon: "🕌",
    topics: [
      {
        id: "shalat",
        title: "Shalat",
        description: "Tiang agama dan kewajiban utama setiap Muslim",
        content: "Shalat adalah rukun Islam yang kedua dan merupakan tiang agama. Shalat wajib dilaksanakan lima waktu dalam sehari semalam oleh setiap Muslim yang telah baligh dan berakal. Shalat memiliki syarat, rukun, dan sunnah yang harus dipenuhi agar sah dan sempurna.",
        quranDalil: [
          {
            ayah: "حَافِظُوا۟ عَلَى ٱلصَّلَوَٰتِ وَٱلصَّلَوٰةِ ٱلْوُسْطَىٰ وَقُومُوا۟ لِلَّهِ قَٰنِتِينَ",
            surah: "Al-Baqarah",
            number: "2:238",
            translation: "Peliharalah semua shalat dan shalat wustha. Dan laksanakanlah (shalat) karena Allah dengan khusyu'."
          },
          {
            ayah: "إِنَّ ٱلصَّلَوٰةَ كَانَتْ عَلَى ٱلْمُؤْمِنِينَ كِتَٰبًۭا مَّوْقُوتًۭا",
            surah: "An-Nisa",
            number: "4:103",
            translation: "Sesungguhnya shalat itu adalah kewajiban yang ditentukan waktunya atas orang-orang yang beriman."
          }
        ],
        hadithDalil: [
          {
            text: "بُنِيَ الْإِسْلَامُ عَلَى خَمْسٍ: شَهَادَةِ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ، وَإِقَامِ الصَّلَاةِ، وَإِيتَاءِ الزَّكَاةِ، وَالْحَجِّ، وَصَوْمِ رَمَضَانَ",
            source: "Shahih Bukhari dan Muslim",
            narrator: "Ibnu Umar radhiyallahu 'anhuma"
          },
          {
            text: "الصَّلَاةُ عِمَادُ الدِّينِ",
            source: "Diriwayatkan oleh Baihaqi",
            narrator: "Umar bin Khattab radhiyallahu 'anhu"
          }
        ],
        practicalExample: "Seorang Muslim yang bekerja harus tetap menjaga shalat lima waktu. Jika sedang dalam perjalanan jauh, boleh menjamak (menggabungkan) shalat Zhuhur dengan Ashar, dan Maghrib dengan Isya, serta mengqashar (meringkas) shalat empat rakaat menjadi dua rakaat."
      },
      {
        id: "puasa",
        title: "Puasa Ramadhan",
        description: "Menahan diri dari makan, minum, dan hal-hal yang membatalkan dari terbit fajar hingga terbenam matahari",
        content: "Puasa Ramadhan adalah rukun Islam yang keempat. Puasa wajib dilaksanakan selama sebulan penuh di bulan Ramadhan bagi setiap Muslim yang telah baligh, berakal, dan mampu. Puasa memiliki niat, syarat, rukun, dan hal-hal yang membatalkannya.",
        quranDalil: [
          {
            ayah: "يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ كُتِبَ عَلَيْكُمُ ٱلصِّيَامُ كَمَا كُتِبَ عَلَى ٱلَّذِينَ مِن قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ",
            surah: "Al-Baqarah",
            number: "2:183",
            translation: "Wahai orang-orang yang beriman! Diwajibkan atas kamu berpuasa sebagaimana diwajibkan atas orang sebelum kamu agar kamu bertakwa."
          },
          {
            ayah: "شَهْرُ رَمَضَانَ ٱلَّذِىٓ أُنزِلَ فِيهِ ٱلْقُرْءَانُ هُدًۭى لِّلنَّاسِ وَبَيِّنَٰتٍۢ مِّنَ ٱلْهُدَىٰ وَٱلْفُرْقَانِ",
            surah: "Al-Baqarah",
            number: "2:185",
            translation: "Bulan Ramadhan adalah (bulan) yang di dalamnya diturunkan Al-Qur'an, sebagai petunjuk bagi manusia dan penjelasan mengenai petunjuk itu dan pembeda (antara yang benar dan yang batil)."
          }
        ],
        hadithDalil: [
          {
            text: "مَنْ صَامَ رَمَضَانَ إِيمَانًا وَاحْتِسَابًا غُفِرَ لَهُ مَا تَقَدَّمَ مِنْ ذَنْبِهِ",
            source: "Shahih Bukhari dan Muslim",
            narrator: "Abu Hurairah radhiyallahu 'anhu"
          },
          {
            text: "إِذَا جَاءَ رَمَضَانُ فُتِّحَتْ أَبْوَابُ الْجَنَّةِ وَغُلِّقَتْ أَبْوَابُ النَّارِ وَصُفِّدَتِ الشَّيَاطِينُ",
            source: "Shahih Bukhari dan Muslim",
            narrator: "Abu Hurairah radhiyallahu 'anhu"
          }
        ],
        practicalExample: "Seorang pekerja yang berpuasa harus menahan diri dari makan dan minum sejak adzan subuh hingga adzan maghrib. Jika sakit atau dalam perjalanan jauh yang menyulitkan, boleh berbuka dan mengqadha di hari lain."
      },
      {
        id: "zakat",
        title: "Zakat",
        description: "Mengeluarkan sebagian harta tertentu untuk diberikan kepada yang berhak menerimanya",
        content: "Zakat adalah rukun Islam yang ketiga dan merupakan kewajiban mengeluarkan sebagian harta yang telah mencapai nisab dan haul kepada 8 golongan yang berhak menerimanya (mustahik). Zakat terbagi menjadi zakat fitrah dan zakat mal (harta).",
        quranDalil: [
          {
            ayah: "وَأَقِيمُوا۟ ٱلصَّلَوٰةَ وَءَاتُوا۟ ٱلزَّكَوٰةَ وَٱرْكَعُوا۟ مَعَ ٱلرَّٰكِعِينَ",
            surah: "Al-Baqarah",
            number: "2:43",
            translation: "Dan laksanakanlah shalat, tunaikanlah zakat, dan rukuklah beserta orang yang rukuk."
          },
          {
            ayah: "إِنَّمَا ٱلصَّدَقَٰتُ لِلْفُقَرَآءِ وَٱلْمَسَٰكِينِ وَٱلْعَٰمِلِينَ عَلَيْهَا وَٱلْمُؤَلَّفَةِ قُلُوبُهُمْ وَفِى ٱلرِّقَابِ وَٱلْغَٰرِمِينَ وَفِى سَبِيلِ ٱللَّهِ وَٱبْنِ ٱلسَّبِيلِ",
            surah: "At-Taubah",
            number: "9:60",
            translation: "Sesungguhnya zakat itu hanyalah untuk orang-orang fakir, orang miskin, amil zakat, yang dilunakkan hatinya (mualaf), untuk (memerdekakan) hamba sahaya, untuk (membebaskan) orang yang berutang, untuk jalan Allah, dan untuk orang yang sedang dalam perjalanan."
          }
        ],
        hadithDalil: [
          {
            text: "مَا مِنْ صَاحِبِ ذَهَبٍ وَلَا فِضَّةٍ لَا يُؤَدِّي مِنْهَا حَقَّهَا إِلَّا إِذَا كَانَ يَوْمُ الْقِيَامَةِ صُفِّحَتْ لَهُ صَفَائِحُ مِنْ نَارٍ",
            source: "Shahih Muslim",
            narrator: "Abu Hurairah radhiyallahu 'anhu"
          },
          {
            text: "فِي الرِّقَةِ رُبْعُ الْعُشْرِ",
            source: "Shahih Bukhari",
            narrator: "Anas bin Malik radhiyallahu 'anhu"
          }
        ],
        practicalExample: "Seseorang yang memiliki emas 100 gram (sudah mencapai nisab 85 gram) dan telah dimiliki selama 1 tahun (haul), wajib mengeluarkan zakat sebesar 2.5% x 100 gram = 2.5 gram emas atau uang senilai itu untuk diberikan kepada mustahik."
      },
      {
        id: "haji",
        title: "Haji dan Umrah",
        description: "Ibadah ke Baitullah di Makkah dengan syarat dan rukun tertentu",
        content: "Haji adalah rukun Islam yang kelima, wajib dilaksanakan sekali seumur hidup bagi yang mampu secara fisik dan finansial. Haji memiliki waktu tertentu (bulan Dzulhijjah), sedangkan umrah dapat dilaksanakan kapan saja. Keduanya memiliki rukun, wajib, dan larangan (ihram) yang harus dipatuhi.",
        quranDalil: [
          {
            ayah: "وَلِلَّهِ عَلَى ٱلنَّاسِ حِجُّ ٱلْبَيْتِ مَنِ ٱسْتَطَاعَ إِلَيْهِ سَبِيلًۭا ۚ وَمَن كَفَرَ فَإِنَّ ٱللَّهَ غَنِىٌّ عَنِ ٱلْعَٰلَمِينَ",
            surah: "Ali Imran",
            number: "3:97",
            translation: "Dan (di antara) kewajiban manusia terhadap Allah adalah melaksanakan ibadah haji ke Baitullah, yaitu bagi orang-orang yang mampu mengadakan perjalanan ke sana."
          },
          {
            ayah: "وَأَتِمُّوا۟ ٱلْحَجَّ وَٱلْعُمْرَةَ لِلَّهِ",
            surah: "Al-Baqarah",
            number: "2:196",
            translation: "Dan sempurnakanlah ibadah haji dan umrah karena Allah."
          }
        ],
        hadithDalil: [
          {
            text: "مَنْ حَجَّ فَلَمْ يَرْفُثْ وَلَمْ يَفْسُقْ رَجَعَ كَيَوْمِ وَلَدَتْهُ أُمُّهُ",
            source: "Shahih Bukhari dan Muslim",
            narrator: "Abu Hurairah radhiyallahu 'anhu"
          },
          {
            text: "الْحَجُّ الْمَبْرُورُ لَيْسَ لَهُ جَزَاءٌ إِلَّا الْجَنَّةُ",
            source: "Shahih Bukhari dan Muslim",
            narrator: "Abu Hurairah radhiyallahu 'anhu"
          }
        ],
        practicalExample: "Seorang Muslim yang telah memiliki biaya cukup, sehat jasmani, dan aman perjalanannya wajib menunaikan haji. Jika berhalangan, boleh mewakilkan kepada orang lain yang telah menunaikan haji untuk dirinya sendiri."
      }
    ]
  },
  {
    id: "muamalah",
    title: "Fiqih Muamalah",
    description: "Hukum-hukum yang mengatur hubungan antar manusia dalam bidang ekonomi dan transaksi",
    icon: "💰",
    topics: [
      {
        id: "jual-beli",
        title: "Jual Beli",
        description: "Tukar menukar harta dengan harta melalui cara tertentu yang dibenarkan syariat",
        content: "Jual beli adalah akad tukar menukar harta dengan harta yang dilakukan dengan ijab dan qabul yang dibenarkan syariat. Jual beli memiliki rukun, syarat, dan berbagai macam bentuk yang diatur dalam Islam. Hukum asalnya adalah mubah (boleh), namun bisa menjadi wajib, sunnah, makruh, atau haram tergantung kondisinya.",
        quranDalil: [
          {
            ayah: "وَأَحَلَّ ٱللَّهُ ٱلْبَيْعَ وَحَرَّمَ ٱلرِّبَوٰا۟",
            surah: "Al-Baqarah",
            number: "2:275",
            translation: "Allah telah menghalalkan jual beli dan mengharamkan riba."
          },
          {
            ayah: "يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ لَا تَأْكُلُوٓا۟ أَمْوَٰلَكُم بَيْنَكُم بِٱلْبَٰطِلِ إِلَّآ أَن تَكُونَ تِجَٰرَةً عَن تَرَاضٍۢ مِّنكُمْ",
            surah: "An-Nisa",
            number: "4:29",
            translation: "Wahai orang-orang yang beriman! Janganlah kamu saling memakan harta sesamamu dengan jalan yang batil, kecuali dalam perdagangan yang berlaku atas dasar suka sama suka di antara kamu."
          }
        ],
        hadithDalil: [
          {
            text: "الْبَيِّعَانِ بِالْخِيَارِ مَا لَمْ يَتَفَرَّقَا",
            source: "Shahih Bukhari dan Muslim",
            narrator: "Ibnu Umar radhiyallahu 'anhuma"
          },
          {
            text: "لَا تَبِيعُوا مَا لَيْسَ عِنْدَكُمْ",
            source: "Sunan Abu Dawud",
            narrator: "Hakim bin Hizam radhiyallahu 'anhu"
          }
        ],
        practicalExample: "Seseorang membeli mobil bekas dari showroom dengan harga Rp 150 juta. Akad jual beli sah jika ada ijab qabul, barang dan harga jelas, kedua pihak cakap hukum, dan tidak ada unsur penipuan. Pembeli berhak memeriksa kondisi mobil (khiyar aib) sebelum menerima secara final."
      },
      {
        id: "hutang-piutang",
        title: "Hutang Piutang (Qardh)",
        description: "Memberikan harta kepada orang lain untuk dikembalikan dengan yang sama",
        content: "Qardh adalah akad pinjam meminjam harta yang akan dikembalikan dengan harta yang sama. Hukum asalnya adalah sunnah bagi yang memberi pinjaman dan mubah bagi yang meminjam. Dalam Islam, hutang piutang tidak boleh mengandung riba (tambahan/bunga). Menunda pembayaran hutang padahal mampu adalah perbuatan zalim.",
        quranDalil: [
          {
            ayah: "مَّن ذَا ٱلَّذِى يُقْرِضُ ٱللَّهَ قَرْضًا حَسَنًۭا فَيُضَٰعِفَهُۥ لَهُۥٓ أَضْعَافًۭا كَثِيرَةًۭ",
            surah: "Al-Baqarah",
            number: "2:245",
            translation: "Siapakah yang mau memberi pinjaman kepada Allah, pinjaman yang baik, maka Allah akan melipatgandakan (balasan) pinjaman itu untuknya dengan lipat ganda yang banyak."
          },
          {
            ayah: "يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوٓا۟ إِذَا تَدَايَنتُم بِدَيْنٍ إِلَىٰٓ أَجَلٍۢ مُّسَمًّۭى فَٱكْتُبُوهُ",
            surah: "Al-Baqarah",
            number: "2:282",
            translation: "Wahai orang-orang yang beriman! Apabila kamu melakukan utang piutang untuk waktu yang ditentukan, hendaklah kamu menuliskannya."
          }
        ],
        hadithDalil: [
          {
            text: "مَطْلُ الْغَنِيِّ ظُلْمٌ",
            source: "Shahih Bukhari dan Muslim",
            narrator: "Abu Hurairah radhiyallahu 'anhu"
          },
          {
            text: "مَنْ أَنْظَرَ مُعْسِرًا أَوْ وَضَعَ عَنْهُ أَظَلَّهُ اللَّهُ فِي ظِلِّهِ",
            source: "Shahih Muslim",
            narrator: "Abu Qatadah radhiyallahu 'anhu"
          }
        ],
        practicalExample: "Ahmad meminjam uang Rp 10 juta kepada Budi untuk modal usaha dengan kesepakatan dikembalikan dalam 6 bulan. Akad ini sah dan Ahmad wajib mengembalikan Rp 10 juta (tidak boleh ada tambahan/bunga). Jika Ahmad kesulitan, Budi dianjurkan memberi keringanan atau bahkan membebaskan sebagian hutang."
      }
    ]
  },
  {
    id: "munakahat",
    title: "Fiqih Munakahat",
    description: "Hukum-hukum yang berkaitan dengan pernikahan, perceraian, dan hubungan keluarga",
    icon: "💍",
    topics: [
      {
        id: "nikah",
        title: "Pernikahan",
        description: "Akad yang menghalalkan pergaulan antara laki-laki dan perempuan yang bukan mahram",
        content: "Nikah adalah akad yang sangat kuat (mitsaqan ghalizan) untuk menghalalkan pergaulan antara laki-laki dan perempuan serta menimbulkan hak dan kewajiban antara keduanya. Pernikahan memiliki rukun dan syarat yang harus dipenuhi agar sah menurut syariat. Hukum nikah bisa wajib, sunnah, mubah, makruh, atau haram tergantung kondisi seseorang.",
        quranDalil: [
          {
            ayah: "وَأَنكِحُوا۟ ٱلْأَيَٰمَىٰ مِنكُمْ وَٱلصَّٰلِحِينَ مِنْ عِبَادِكُمْ وَإِمَآئِكُمْ",
            surah: "An-Nur",
            number: "24:32",
            translation: "Dan nikahkanlah orang-orang yang masih membujang di antara kamu, dan juga orang-orang yang layak (menikah) dari hamba-hamba sahayamu yang laki-laki dan perempuan."
          },
          {
            ayah: "وَمِنْ ءَايَٰتِهِۦٓ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَٰجًۭا لِّتَسْكُنُوٓا۟ إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةًۭ وَرَحْمَةً",
            surah: "Ar-Rum",
            number: "30:21",
            translation: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."
          }
        ],
        hadithDalil: [
          {
            text: "يَا مَعْشَرَ الشَّبَابِ مَنِ اسْتَطَاعَ مِنْكُمُ الْبَاءَةَ فَلْيَتَزَوَّجْ فَإِنَّهُ أَغَضُّ لِلْبَصَرِ وَأَحْصَنُ لِلْفَرْجِ",
            source: "Shahih Bukhari dan Muslim",
            narrator: "Abdullah bin Mas'ud radhiyallahu 'anhu"
          },
          {
            text: "النِّكَاحُ مِنْ سُنَّتِي فَمَنْ لَمْ يَعْمَلْ بِسُنَّتِي فَلَيْسَ مِنِّي",
            source: "Shahih Ibnu Hibban",
            narrator: "Aisyah radhiyallahu 'anha"
          }
        ],
        practicalExample: "Ahmad ingin menikahi Fatimah. Syarat sahnya nikah: ada calon suami (Ahmad), calon istri (Fatimah), wali (ayah Fatimah), dua saksi, ijab qabul, dan mahar. Akad nikah dilakukan dengan ijab dari wali 'Saya nikahkan anak saya Fatimah dengan Ahmad dengan mahar Rp 10 juta' dan qabul dari Ahmad 'Saya terima nikahnya'."
      },
      {
        id: "talak",
        title: "Talak dan Perceraian",
        description: "Melepaskan ikatan pernikahan dengan lafaz atau yang semakna dengannya",
        content: "Talak adalah melepaskan ikatan pernikahan atau mengurangi pelepasannya dengan lafaz tertentu. Talak adalah perbuatan yang halal namun dibenci Allah. Talak terbagi menjadi talak raj'i (boleh rujuk), talak ba'in sughra (tidak boleh rujuk kecuali dengan akad baru), dan talak ba'in kubra (talak tiga, tidak boleh rujuk kecuali setelah istri menikah dengan laki-laki lain dan bercerai).",
        quranDalil: [
          {
            ayah: "ٱلطَّلَٰقُ مَرَّتَانِ ۖ فَإِمْسَاكٌۢ بِمَعْرُوفٍ أَوْ تَسْرِيحٌۢ بِإِحْسَٰنٍۢ",
            surah: "Al-Baqarah",
            number: "2:229",
            translation: "Talak (yang dapat dirujuk) itu dua kali. (Setelah itu suami dapat) menahan dengan baik, atau melepaskan dengan baik."
          },
          {
            ayah: "فَإِن طَلَّقَهَا فَلَا تَحِلُّ لَهُۥ مِنۢ بَعْدُ حَتَّىٰ تَنكِحَ زَوْجًا غَيْرَهُۥ",
            surah: "Al-Baqarah",
            number: "2:230",
            translation: "Kemudian jika dia menceraikannya (setelah talak yang kedua), maka perempuan itu tidak halal lagi baginya sebelum dia menikah dengan suami yang lain."
          }
        ],
        hadithDalil: [
          {
            text: "أَبْغَضُ الْحَلَالِ إِلَى اللَّهِ الطَّلَاقُ",
            source: "Sunan Abu Dawud",
            narrator: "Ibnu Umar radhiyallahu 'anhuma"
          },
          {
            text: "كُلُّ طَلَاقٍ جَائِزٌ إِلَّا طَلَاقَ الْمَعْتُوهِ الْمَغْلُوبِ عَلَى عَقْلِهِ",
            source: "Sunan Ibnu Majah",
            narrator: "Ali bin Abi Thalib radhiyallahu 'anhu"
          }
        ],
        practicalExample: "Suami menjatuhkan talak satu kepada istrinya dengan ucapan 'Aku ceraikan kamu'. Talak ini jatuh dan istri memasuki masa iddah 3 kali suci. Selama iddah, suami masih boleh rujuk tanpa akad baru. Jika masa iddah selesai dan tidak rujuk, maka talak menjadi ba'in dan jika ingin kembali harus dengan akad nikah baru."
      }
    ]
  },
  {
    id: "mawaris",
    title: "Fiqih Mawaris",
    description: "Hukum pembagian harta warisan menurut syariat Islam",
    icon: "📜",
    topics: [
      {
        id: "waris",
        title: "Pembagian Waris",
        description: "Tata cara pembagian harta peninggalan kepada ahli waris yang berhak",
        content: "Mawaris (faraid) adalah ilmu yang mempelajari pembagian harta warisan kepada ahli waris yang berhak menerimanya. Pembagian waris dalam Islam sangat detail dan adil, dengan mempertimbangkan kedekatan hubungan dan kebutuhan masing-masing ahli waris. Harta warisan dibagikan setelah dikurangi biaya pemakaman, pelunasan hutang, dan pelaksanaan wasiat (maksimal 1/3 harta).",
        quranDalil: [
          {
            ayah: "يُوصِيكُمُ ٱللَّهُ فِىٓ أَوْلَٰدِكُمْ ۖ لِلذَّكَرِ مِثْلُ حَظِّ ٱلْأُنثَيَيْنِ",
            surah: "An-Nisa",
            number: "4:11",
            translation: "Allah mensyariatkan (mewajibkan) kepadamu tentang (pembagian warisan untuk) anak-anakmu, (yaitu) bagian seorang anak laki-laki sama dengan bagian dua orang anak perempuan."
          },
          {
            ayah: "وَلَكُمْ نِصْفُ مَا تَرَكَ أَزْوَٰجُكُمْ إِن لَّمْ يَكُن لَّهُنَّ وَلَدٌۭ",
            surah: "An-Nisa",
            number: "4:12",
            translation: "Dan bagianmu (suami-suami) adalah seperdua dari harta yang ditinggalkan oleh istri-istrimu, jika mereka tidak mempunyai anak."
          }
        ],
        hadithDalil: [
          {
            text: "أَلْحِقُوا الْفَرَائِضَ بِأَهْلِهَا فَمَا بَقِيَ فَهُوَ لِأَوْلَى رَجُلٍ ذَكَرٍ",
            source: "Shahih Bukhari dan Muslim",
            narrator: "Ibnu Abbas radhiyallahu 'anhuma"
          },
          {
            text: "تَعَلَّمُوا الْفَرَائِضَ وَعَلِّمُوهَا النَّاسَ فَإِنَّهَا نِصْفُ الْعِلْمِ",
            source: "Sunan Ibnu Majah",
            narrator: "Abdullah bin Mas'ud radhiyallahu 'anhu"
          }
        ],
        practicalExample: "Seorang laki-laki meninggal meninggalkan harta Rp 600 juta, istri, 2 anak laki-laki, dan 1 anak perempuan. Pembagian: Istri mendapat 1/8 (Rp 75 juta), sisanya Rp 525 juta dibagi untuk anak-anak dengan perbandingan 2:1 (laki-laki:perempuan). Masing-masing anak laki-laki mendapat Rp 210 juta, anak perempuan mendapat Rp 105 juta."
      }
    ]
  }
];
