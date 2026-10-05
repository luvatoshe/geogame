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
                    new Country("Россия", "RU", 1),
                    new Country("США", "US", 1),
                    new Country("Канада", "CA", 1),
                    new Country("Бразилия", "BR", 1),
                    new Country("Аргентина", "AR", 1),
                    new Country("Франция", "FR", 1),
                    new Country("Германия", "DE", 1),
                    new Country("Великобритания", "GB", 1),
                    new Country("Италия", "IT", 1),
                    new Country("Испания", "ES", 1),
                    new Country("Египет", "EG", 1),
                    new Country("ЮАР", "ZA", 1),
                    new Country("Индия", "IN", 1),
                    new Country("Китай", "CN", 1),
                    new Country("Япония", "JP", 1),
                    new Country("Австралия", "AU", 1),
                    new Country("Мексика", "MX", 1),
                    new Country("Турция", "TR", 1),
                    new Country("Иран", "IR", 1),
                    new Country("Казахстан", "KZ", 1),

                    // Уровень 2
                    new Country("Норвегия", "NO", 2),
                    new Country("Швеция", "SE", 2),
                    new Country("Польша", "PL", 2),
                    new Country("Украина", "UA", 2),
                    new Country("Саудовская Аравия", "SA", 2),
                    new Country("Пакистан", "PK", 2),
                    new Country("Индонезия", "ID", 2),
                    new Country("Южная Корея", "KR", 2),
                    new Country("Нигерия", "NG", 2),
                    new Country("Кения", "KE", 2),

                    // Уровень 3
                    new Country("Финляндия", "FI", 3),
                    new Country("Нидерланды", "NL", 3),
                    new Country("Бельгия", "BE", 3),
                    new Country("Швейцария", "CH", 3),
                    new Country("Австрия", "AT", 3),
                    new Country("Португалия", "PT", 3),
                    new Country("Греция", "GR", 3),
                    new Country("Румыния", "RO", 3),
                    new Country("Вьетнам", "VN", 3),
                    new Country("Таиланд", "TH", 3),

                    // Уровень 4
                    new Country("Алжир", "DZ", 4),
                    new Country("Марокко", "MA", 4),
                    new Country("Эфиопия", "ET", 4),
                    new Country("Танзания", "TZ", 4),
                    new Country("Гана", "GH", 4),
                    new Country("Колумбия", "CO", 4),
                    new Country("Венесуэла", "VE", 4),
                    new Country("Перу", "PE", 4),
                    new Country("Чили", "CL", 4),
                    new Country("Куба", "CU", 4),

                    // Уровень 5
                    new Country("Беларусь", "BY", 5),
                    new Country("Чехия", "CZ", 5),
                    new Country("Венгрия", "HU", 5),
                    new Country("Болгария", "BG", 5),
                    new Country("Сербия", "RS", 5),
                    new Country("Хорватия", "HR", 5),
                    new Country("Словакия", "SK", 5),
                    new Country("Литва", "LT", 5),
                    new Country("Латвия", "LV", 5),
                    new Country("Эстония", "EE", 5),

                    // Уровень 6
                    new Country("Ирландия", "IE", 6),
                    new Country("Исландия", "IS", 6),
                    new Country("Дания", "DK", 6),
                    new Country("Молдова", "MD", 6),
                    new Country("Албания", "AL", 6),
                    new Country("Северная Македония", "MK", 6),
                    new Country("Босния и Герцеговина", "BA", 6),
                    new Country("Словения", "SI", 6),
                    new Country("Черногория", "ME", 6),
                    new Country("Люксембург", "LU", 6),

                    // Уровень 7
                    new Country("Малайзия", "MY", 7),
                    new Country("Филиппины", "PH", 7),
                    new Country("Сингапур", "SG", 7),
                    new Country("Мьянма", "MM", 7),
                    new Country("Камбоджа", "KH", 7),
                    new Country("Лаос", "LA", 7),
                    new Country("Бангладеш", "BD", 7),
                    new Country("Шри-Ланка", "LK", 7),
                    new Country("Непал", "NP", 7),
                    new Country("Афганистан", "AF", 7),

                    // Уровень 8
                    new Country("Ирак", "IQ", 8),
                    new Country("Сирия", "SY", 8),
                    new Country("Иордания", "JO", 8),
                    new Country("Ливан", "LB", 8),
                    new Country("Израиль", "IL", 8),
                    new Country("Йемен", "YE", 8),
                    new Country("Оман", "OM", 8),
                    new Country("ОАЭ", "AE", 8),
                    new Country("Катар", "QA", 8),
                    new Country("Кувейт", "KW", 8),

                    // Уровень 9
                    new Country("Узбекистан", "UZ", 9),
                    new Country("Туркменистан", "TM", 9),
                    new Country("Киргизия", "KG", 9),
                    new Country("Таджикистан", "TJ", 9),
                    new Country("Азербайджан", "AZ", 9),
                    new Country("Армения", "AM", 9),
                    new Country("Грузия", "GE", 9),
                    new Country("Монголия", "MN", 9),
                    new Country("Северная Корея", "KP", 9),
                    new Country("Кипр", "CY", 9),

                    // Уровень 10
                    new Country("Судан", "SD", 10),
                    new Country("Ливия", "LY", 10),
                    new Country("Тунис", "TN", 10),
                    new Country("Ангола", "AO", 10),
                    new Country("Мозамбик", "MZ", 10),
                    new Country("Зимбабве", "ZW", 10),
                    new Country("Замбия", "ZM", 10),
                    new Country("Мадагаскар", "MG", 10),
                    new Country("Камерун", "CM", 10),
                    new Country("Кот-д'Ивуар", "CI", 10),

                    // Уровень 11
                    new Country("Сенегал", "SN", 11),
                    new Country("Мали", "ML", 11),
                    new Country("Нигер", "NE", 11),
                    new Country("Чад", "TD", 11),
                    new Country("Сомали", "SO", 11),
                    new Country("Уганда", "UG", 11),
                    new Country("Руанда", "RW", 11),
                    new Country("Ботсвана", "BW", 11),
                    new Country("Намибия", "NA", 11),
                    new Country("Малави", "MW", 11),

                    // Уровень 12
                    new Country("Гватемала", "GT", 12),
                    new Country("Гондурас", "HN", 12),
                    new Country("Сальвадор", "SV", 12),
                    new Country("Никарагуа", "NI", 12),
                    new Country("Коста-Рика", "CR", 12),
                    new Country("Панама", "PA", 12),
                    new Country("Доминикана", "DO", 12),
                    new Country("Гаити", "HT", 12),
                    new Country("Ямайка", "JM", 12),
                    new Country("Тринидад и Тобаго", "TT", 12),

                    // Уровень 13
                    new Country("Эквадор", "EC", 13),
                    new Country("Боливия", "BO", 13),
                    new Country("Парагвай", "PY", 13),
                    new Country("Уругвай", "UY", 13),
                    new Country("Гайана", "GY", 13),
                    new Country("Суринам", "SR", 13),
                    new Country("Белиз", "BZ", 13),
                    new Country("Багамы", "BS", 13),
                    new Country("Барбадос", "BB", 13),
                    new Country("Гренада", "GD", 13),

                    // Уровень 14
                    new Country("Новая Зеландия", "NZ", 14),
                    new Country("Папуа-Новая Гвинея", "PG", 14),
                    new Country("Фиджи", "FJ", 14),
                    new Country("Соломоновы Острова", "SB", 14),
                    new Country("Вануату", "VU", 14),
                    new Country("Самоа", "WS", 14),
                    new Country("Тонга", "TO", 14),
                    new Country("Кирибати", "KI", 14),
                    new Country("Бруней", "BN", 14),
                    new Country("Восточный Тимор", "TL", 14),

                    // Уровень 15
                    new Country("Бутан", "BT", 15),
                    new Country("Мальдивы", "MV", 15),
                    new Country("Мальта", "MT", 15),
                    new Country("Андорра", "AD", 15),
                    new Country("Монако", "MC", 15),
                    new Country("Сан-Марино", "SM", 15),
                    new Country("Лихтенштейн", "LI", 15),
                    new Country("Ватикан", "VA", 15),
                    new Country("Палестина", "PS", 15),
                    new Country("Бахрейн", "BH", 15),

                    // Уровень 16
                    new Country("Мавритания", "MR", 16),
                    new Country("Гамбия", "GM", 16),
                    new Country("Гвинея-Бисау", "GW", 16),
                    new Country("Гвинея", "GN", 16),
                    new Country("Сьерра-Леоне", "SL", 16),
                    new Country("Либерия", "LR", 16),
                    new Country("Того", "TG", 16),
                    new Country("Бенин", "BJ", 16),
                    new Country("Буркина-Фасо", "BF", 16),
                    new Country("ЦАР", "CF", 16),

                    // Уровень 17
                    new Country("Конго", "CG", 17),
                    new Country("ДР Конго", "CD", 17),
                    new Country("Габон", "GA", 17),
                    new Country("Экваториальная Гвинея", "GQ", 17),
                    new Country("Сан-Томе и Принсипи", "ST", 17),
                    new Country("Эритрея", "ER", 17),
                    new Country("Джибути", "DJ", 17),
                    new Country("Коморы", "KM", 17),
                    new Country("Маврикий", "MU", 17),
                    new Country("Сейшелы", "SC", 17),

                    // Уровень 18
                    new Country("Эсватини", "SZ", 18),
                    new Country("Лесото", "LS", 18),
                    new Country("Кабо-Верде", "CV", 18),
                    new Country("Южный Судан", "SS", 18),
                    new Country("Антигуа и Барбуда", "AG", 18),
                    new Country("Доминика", "DM", 18),
                    new Country("Сент-Китс и Невис", "KN", 18),
                    new Country("Сент-Люсия", "LC", 18),
                    new Country("Сент-Винсент и Гренадины", "VC", 18),
                    new Country("Маршалловы Острова", "MH", 18),

                    // Уровень 19
                    new Country("Микронезия", "FM", 19),
                    new Country("Науру", "NR", 19),
                    new Country("Палау", "PW", 19),
                    new Country("Тувалу", "TV", 19),
                    new Country("Бурунди", "BI", 19)
            ));

            System.out.println(">>> Загружено уровней: " + levelRepository.count());
            System.out.println(">>> Загружено стран: " + countryRepository.count());
        };
    }
}
