package com.example.geogame.config;

import com.example.geogame.model.Country;
import com.example.geogame.model.Level;
import com.example.geogame.repository.CountryRepository;
import com.example.geogame.repository.LevelRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner loadData(CountryRepository countryRepository,
                                      LevelRepository levelRepository) {
        return args -> {
            if (levelRepository.count() > 0) {
                return;
            }

            levelRepository.saveAll(List.of(
                    new Level("Уровень 1", "Базовый мир", 1),
                    new Level("Уровень 2", "Северная Европа и Ближний Восток", 2),
                    new Level("Уровень 3", "Центральная Европа и Юго-Восточная Азия", 3),
                    new Level("Уровень 4", "Африка и Южная Америка", 4),
                    new Level("Уровень 5", "Восточная Европа и Балканы", 5),
                    new Level("Уровень 6", "Западная и Северная Европа", 6),
                    new Level("Уровень 7", "Юго-Восточная Азия", 7),
                    new Level("Уровень 8", "Ближний Восток", 8),
                    new Level("Уровень 9", "Центральная Азия и Кавказ", 9),
                    new Level("Уровень 10", "Северная и Центральная Африка", 10),
                    new Level("Уровень 11", "Западная и Южная Африка", 11),
                    new Level("Уровень 12", "Центральная Америка и Карибы", 12),
                    new Level("Уровень 13", "Южная Америка и Малые Антилы", 13),
                    new Level("Уровень 14", "Океания", 14),
                    new Level("Уровень 15", "Малые страны Азии и Европы", 15),
                    new Level("Уровень 16", "Западная Африка", 16),
                    new Level("Уровень 17", "Экваториальная Африка и острова", 17),
                    new Level("Уровень 18", "Малые островные государства", 18),
                    new Level("Уровень 19", "Последние страны", 19)
            ));

            countryRepository.saveAll(List.of(
                    // Уровень 1
                    new Country("Россия",            "RU", "Москва",         1),
                    new Country("США",               "US", "Вашингтон",      1),
                    new Country("Канада",            "CA", "Оттава",         1),
                    new Country("Бразилия",          "BR", "Бразилиа",       1),
                    new Country("Аргентина",         "AR", "Буэнос-Айрес",   1),
                    new Country("Франция",           "FR", "Париж",          1),
                    new Country("Германия",          "DE", "Берлин",         1),
                    new Country("Великобритания",    "GB", "Лондон",         1),
                    new Country("Италия",            "IT", "Рим",            1),
                    new Country("Испания",           "ES", "Мадрид",         1),
                    new Country("Египет",            "EG", "Каир",           1),
                    new Country("ЮАР",               "ZA", "Претория",       1),
                    new Country("Индия",             "IN", "Нью-Дели",       1),
                    new Country("Китай",             "CN", "Пекин",          1),
                    new Country("Япония",            "JP", "Токио",          1),
                    new Country("Австралия",         "AU", "Канберра",       1),
                    new Country("Мексика",           "MX", "Мехико",         1),
                    new Country("Турция",            "TR", "Анкара",         1),
                    new Country("Иран",              "IR", "Тегеран",        1),
                    new Country("Казахстан",         "KZ", "Астана",         1),

                    // Уровень 2
                    new Country("Норвегия",          "NO", "Осло",           2),
                    new Country("Швеция",            "SE", "Стокгольм",      2),
                    new Country("Польша",            "PL", "Варшава",        2),
                    new Country("Украина",           "UA", "Киев",           2),
                    new Country("Саудовская Аравия", "SA", "Эр-Рияд",        2),
                    new Country("Пакистан",          "PK", "Исламабад",      2),
                    new Country("Индонезия",         "ID", "Джакарта",       2),
                    new Country("Южная Корея",       "KR", "Сеул",           2),
                    new Country("Нигерия",           "NG", "Абуджа",         2),
                    new Country("Кения",             "KE", "Найроби",        2),

                    // Уровень 3
                    new Country("Финляндия",         "FI", "Хельсинки",      3),
                    new Country("Нидерланды",        "NL", "Амстердам",      3),
                    new Country("Бельгия",           "BE", "Брюссель",       3),
                    new Country("Швейцария",         "CH", "Берн",           3),
                    new Country("Австрия",           "AT", "Вена",           3),
                    new Country("Португалия",        "PT", "Лиссабон",       3),
                    new Country("Греция",            "GR", "Афины",          3),
                    new Country("Румыния",           "RO", "Бухарест",       3),
                    new Country("Вьетнам",           "VN", "Ханой",          3),
                    new Country("Таиланд",           "TH", "Бангкок",        3),

                    // Уровень 4
                    new Country("Алжир",             "DZ", "Алжир",          4),
                    new Country("Марокко",           "MA", "Рабат",          4),
                    new Country("Эфиопия",           "ET", "Аддис-Абеба",    4),
                    new Country("Танзания",          "TZ", "Додома",         4),
                    new Country("Гана",              "GH", "Аккра",          4),
                    new Country("Колумбия",          "CO", "Богота",         4),
                    new Country("Венесуэла",         "VE", "Каракас",        4),
                    new Country("Перу",              "PE", "Лима",           4),
                    new Country("Чили",              "CL", "Сантьяго",       4),
                    new Country("Куба",              "CU", "Гавана",         4),

                    // Уровень 5
                    new Country("Беларусь",          "BY", "Минск",          5),
                    new Country("Чехия",             "CZ", "Прага",          5),
                    new Country("Венгрия",           "HU", "Будапешт",       5),
                    new Country("Болгария",          "BG", "София",          5),
                    new Country("Сербия",            "RS", "Белград",        5),
                    new Country("Хорватия",          "HR", "Загреб",         5),
                    new Country("Словакия",          "SK", "Братислава",     5),
                    new Country("Литва",             "LT", "Вильнюс",        5),
                    new Country("Латвия",            "LV", "Рига",           5),
                    new Country("Эстония",           "EE", "Таллин",         5),

                    // Уровень 6
                    new Country("Ирландия",          "IE", "Дублин",         6),
                    new Country("Исландия",          "IS", "Рейкьявик",      6),
                    new Country("Дания",             "DK", "Копенгаген",     6),
                    new Country("Молдова",           "MD", "Кишинёв",        6),
                    new Country("Албания",           "AL", "Тирана",         6),
                    new Country("Северная Македония","MK", "Скопье",         6),
                    new Country("Босния и Герцеговина","BA", "Сараево",       6),
                    new Country("Словения",          "SI", "Любляна",        6),
                    new Country("Черногория",        "ME", "Подгорица",      6),
                    new Country("Люксембург",        "LU", "Люксембург",     6),

                    // Уровень 7
                    new Country("Малайзия",          "MY", "Куала-Лумпур",   7),
                    new Country("Филиппины",         "PH", "Манила",         7),
                    new Country("Сингапур",          "SG", "Сингапур",       7),
                    new Country("Мьянма",            "MM", "Нейпьидо",       7),
                    new Country("Камбоджа",          "KH", "Пномпень",       7),
                    new Country("Лаос",              "LA", "Вьентьян",       7),
                    new Country("Бангладеш",         "BD", "Дакка",          7),
                    new Country("Шри-Ланка",         "LK", "Коломбо",        7),
                    new Country("Непал",             "NP", "Катманду",       7),
                    new Country("Афганистан",        "AF", "Кабул",          7),

                    // Уровень 8
                    new Country("Ирак",              "IQ", "Багдад",         8),
                    new Country("Сирия",             "SY", "Дамаск",         8),
                    new Country("Иордания",          "JO", "Амман",          8),
                    new Country("Ливан",             "LB", "Бейрут",         8),
                    new Country("Израиль",           "IL", "Иерусалим",      8),
                    new Country("Йемен",             "YE", "Сана",           8),
                    new Country("Оман",              "OM", "Маскат",         8),
                    new Country("ОАЭ",               "AE", "Абу-Даби",       8),
                    new Country("Катар",             "QA", "Доха",           8),
                    new Country("Кувейт",            "KW", "Эль-Кувейт",     8),

                    // Уровень 9
                    new Country("Узбекистан",        "UZ", "Ташкент",        9),
                    new Country("Туркменистан",      "TM", "Ашхабад",        9),
                    new Country("Киргизия",          "KG", "Бишкек",         9),
                    new Country("Таджикистан",       "TJ", "Душанбе",        9),
                    new Country("Азербайджан",       "AZ", "Баку",           9),
                    new Country("Армения",           "AM", "Ереван",         9),
                    new Country("Грузия",            "GE", "Тбилиси",        9),
                    new Country("Монголия",          "MN", "Улан-Батор",     9),
                    new Country("Северная Корея",    "KP", "Пхеньян",        9),
                    new Country("Кипр",              "CY", "Никосия",        9),

                    // Уровень 10
                    new Country("Судан",             "SD", "Хартум",        10),
                    new Country("Ливия",             "LY", "Триполи",       10),
                    new Country("Тунис",             "TN", "Тунис",         10),
                    new Country("Ангола",            "AO", "Луанда",        10),
                    new Country("Мозамбик",          "MZ", "Мапуту",        10),
                    new Country("Зимбабве",          "ZW", "Хараре",        10),
                    new Country("Замбия",            "ZM", "Лусака",        10),
                    new Country("Мадагаскар",        "MG", "Антананариву",  10),
                    new Country("Камерун",           "CM", "Яунде",         10),
                    new Country("Кот-д'Ивуар",       "CI", "Ямусукро",      10),

                    // Уровень 11
                    new Country("Сенегал",           "SN", "Дакар",         11),
                    new Country("Мали",              "ML", "Бамако",        11),
                    new Country("Нигер",             "NE", "Ниамей",        11),
                    new Country("Чад",               "TD", "Нджамена",      11),
                    new Country("Сомали",            "SO", "Могадишо",      11),
                    new Country("Уганда",            "UG", "Кампала",       11),
                    new Country("Руанда",            "RW", "Кигали",        11),
                    new Country("Ботсвана",          "BW", "Габороне",      11),
                    new Country("Намибия",           "NA", "Виндхук",       11),
                    new Country("Малави",            "MW", "Лилонгве",      11),

                    // Уровень 12
                    new Country("Гватемала",         "GT", "Гватемала",     12),
                    new Country("Гондурас",          "HN", "Тегусигальпа",  12),
                    new Country("Сальвадор",         "SV", "Сан-Сальвадор", 12),
                    new Country("Никарагуа",         "NI", "Манагуа",       12),
                    new Country("Коста-Рика",        "CR", "Сан-Хосе",      12),
                    new Country("Панама",            "PA", "Панама",        12),
                    new Country("Доминикана",        "DO", "Санто-Доминго", 12),
                    new Country("Гаити",             "HT", "Порт-о-Пренс",  12),
                    new Country("Ямайка",            "JM", "Кингстон",      12),
                    new Country("Тринидад и Тобаго", "TT", "Порт-оф-Спейн", 12),

                    // Уровень 13
                    new Country("Эквадор",           "EC", "Кито",          13),
                    new Country("Боливия",           "BO", "Сукре",         13),
                    new Country("Парагвай",          "PY", "Асунсьон",      13),
                    new Country("Уругвай",           "UY", "Монтевидео",    13),
                    new Country("Гайана",            "GY", "Джорджтаун",    13),
                    new Country("Суринам",           "SR", "Парамарибо",    13),
                    new Country("Белиз",             "BZ", "Бельмопан",     13),
                    new Country("Багамы",            "BS", "Нассау",        13),
                    new Country("Барбадос",          "BB", "Бриджтаун",     13),
                    new Country("Гренада",           "GD", "Сент-Джорджес", 13),

                    // Уровень 14
                    new Country("Новая Зеландия",    "NZ", "Веллингтон",    14),
                    new Country("Папуа-Новая Гвинея","PG", "Порт-Морсби",   14),
                    new Country("Фиджи",             "FJ", "Сува",          14),
                    new Country("Соломоновы Острова","SB", "Хониара",       14),
                    new Country("Вануату",           "VU", "Порт-Вила",     14),
                    new Country("Самоа",             "WS", "Апиа",          14),
                    new Country("Тонга",             "TO", "Нукуалофа",     14),
                    new Country("Кирибати",          "KI", "Южная Тарава",  14),
                    new Country("Бруней",            "BN", "Бандар-Сери-Бегаван", 14),
                    new Country("Восточный Тимор",   "TL", "Дили",          14),

                    // Уровень 15
                    new Country("Бутан",             "BT", "Тхимпху",       15),
                    new Country("Мальдивы",          "MV", "Мале",          15),
                    new Country("Мальта",            "MT", "Валлетта",      15),
                    new Country("Андорра",           "AD", "Андорра-ла-Велья", 15),
                    new Country("Монако",            "MC", "Монако",        15),
                    new Country("Сан-Марино",        "SM", "Сан-Марино",    15),
                    new Country("Лихтенштейн",       "LI", "Вадуц",         15),
                    new Country("Ватикан",           "VA", "Ватикан",       15),
                    new Country("Палестина",         "PS", "Рамалла",       15),
                    new Country("Бахрейн",           "BH", "Манама",        15),

                    // Уровень 16
                    new Country("Мавритания",        "MR", "Нуакшот",       16),
                    new Country("Гамбия",            "GM", "Банжул",        16),
                    new Country("Гвинея-Бисау",      "GW", "Бисау",         16),
                    new Country("Гвинея",            "GN", "Конакри",       16),
                    new Country("Сьерра-Леоне",      "SL", "Фритаун",       16),
                    new Country("Либерия",           "LR", "Монровия",      16),
                    new Country("Того",              "TG", "Ломе",          16),
                    new Country("Бенин",             "BJ", "Порто-Ново",    16),
                    new Country("Буркина-Фасо",      "BF", "Уагадугу",      16),
                    new Country("ЦАР",               "CF", "Банги",         16),

                    // Уровень 17
                    new Country("Конго",             "CG", "Браззавиль",    17),
                    new Country("ДР Конго",          "CD", "Киншаса",       17),
                    new Country("Габон",             "GA", "Либревиль",     17),
                    new Country("Экваториальная Гвинея","GQ", "Малабо",       17),
                    new Country("Сан-Томе и Принсипи","ST", "Сан-Томе",      17),
                    new Country("Эритрея",           "ER", "Асмэра",        17),
                    new Country("Джибути",           "DJ", "Джибути",       17),
                    new Country("Коморы",            "KM", "Морони",        17),
                    new Country("Маврикий",          "MU", "Порт-Луи",      17),
                    new Country("Сейшелы",           "SC", "Виктория",      17),

                    // Уровень 18
                    new Country("Эсватини",          "SZ", "Мбабане",       18),
                    new Country("Лесото",            "LS", "Масеру",        18),
                    new Country("Кабо-Верде",        "CV", "Прая",          18),
                    new Country("Южный Судан",       "SS", "Джуба",         18),
                    new Country("Антигуа и Барбуда", "AG", "Сент-Джонс",    18),
                    new Country("Доминика",          "DM", "Розо",          18),
                    new Country("Сент-Китс и Невис", "KN", "Бастер",        18),
                    new Country("Сент-Люсия",        "LC", "Кастри",        18),
                    new Country("Сент-Винсент и Гренадины","VC", "Кингстаун", 18),
                    new Country("Маршалловы Острова","MH", "Маджуро",       18),

                    // Уровень 19
                    new Country("Микронезия",        "FM", "Паликир",       19),
                    new Country("Науру",             "NR", "Ярен",          19),
                    new Country("Палау",             "PW", "Нгерулмуд",     19),
                    new Country("Тувалу",            "TV", "Фунафути",      19),
                    new Country("Бурунди",           "BI", "Гитега",        19)
            ));

            System.out.println(">>> Загружено уровней: " + levelRepository.count());
            System.out.println(">>> Загружено стран: " + countryRepository.count());
        };
    }
}
