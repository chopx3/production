use firecatcher;

-- Add tagsGroup group
INSERT INTO taggroup VALUES (1, 'Main', 'Основная группа тэгов');
INSERT INTO taggroup VALUES (2, 'Infologic model', 'Инфологическая модель сайта');
INSERT INTO taggroup VALUES (3, 'Site search', 'Вопросы по поиску на сайте');
INSERT INTO taggroup VALUES (4, 'Items','Вопросы, связанные с объявлениями');
INSERT INTO taggroup VALUES (5, 'Site other','Другие вопросы');


-- Add 'Main' tags
    INSERT INTO tags VALUES (1, 'Listing Fees', 'lf', 'Вопросы по платным размещениям');
    INSERT INTO tags VALUES (2, 'Vas', 'vas', 'Вопросы по дополнительным услугам');
    INSERT INTO tags VALUES (3, 'Подписка', 'subs', 'Вопросы по подпискам');
    INSERT INTO tags VALUES (4, 'Feedback', 'feedback', 'Обратная связь от клиентов');
-- Add 'InfoLogic model' tags
    INSERT INTO tags VALUES (5, 'Добавить регион или город', 'model_geo', 'Добавить регион или город');
    INSERT INTO tags VALUES (6, 'Добавить категорию','model_cat', 'Добавить категорию');
-- Add 'Site search' tags
    INSERT INTO tags VALUES (7, 'Фильтры', 'search_filters', 'Проблемы с фильтрами');
    INSERT INTO tags VALUES (8, 'Проблемы', 'search_problems', 'Проблемы поиска');
    INSERT INTO tags VALUES (9, 'Избранное и сохраненные','search_favourite', 'Сохраненный поиск и избранное');
-- Add 'Items' tags
    INSERT INTO tags VALUES (10, 'Содержимое','item_inside', 'Содержание объявления');
    INSERT INTO tags VALUES (11, 'Подача и редактирование', 'item_add', 'Подача или редактирование объявления');
    INSERT INTO tags VALUES (12, 'Отзывы', 'item_review', 'Добавить отзывы покупателей к объявлениям');
    INSERT INTO tags VALUES (13, 'LF VAS', 'item_lf', 'Платные услуги и разовые размещения');
-- Add 'Site other' tags
    INSERT INTO tags VALUES (14, 'Навигация и юзабилити', 'site_navigation', 'Навигация и юзабилити');
    INSERT INTO tags VALUES (15, 'Mobile', 'site_mobile', 'Вопросы о мобильных версиях');
    INSERT INTO tags VALUES (16, 'Мессенджер', 'site_messenger', 'Проблемы с мессенджером');
    INSERT INTO tags VALUES (17, 'Безопасность', 'site_safety', 'Вопросы безопасности');
    INSERT INTO tags VALUES (18, 'Остальные', 'site_other', 'Другие вопросы');

-- Add mapping 'Main'
    INSERT INTO taggroup_tags VALUES (1,1);
    INSERT INTO taggroup_tags VALUES (1,2);
    INSERT INTO taggroup_tags VALUES (1,3);
    INSERT INTO taggroup_tags VALUES (1,4);
-- Add mapping 'Info logic model'
    INSERT INTO taggroup_tags VALUES (2,5);
    INSERT INTO taggroup_tags VALUES (2,6);
-- Add mapping 'Site search'
    INSERT INTO taggroup_tags VALUES (3,7);
    INSERT INTO taggroup_tags VALUES (3,8);
    INSERT INTO taggroup_tags VALUES (3,9);
-- Add mapping 'Items'
    INSERT INTO taggroup_tags VALUES (4,10);
    INSERT INTO taggroup_tags VALUES (4,11);
    INSERT INTO taggroup_tags VALUES (4,12);
    INSERT INTO taggroup_tags VALUES (4,13);
-- Add mapping 'Site other'
    INSERT INTO taggroup_tags VALUES (5,14);
    INSERT INTO taggroup_tags VALUES (5,15);
    INSERT INTO taggroup_tags VALUES (5,16);
    INSERT INTO taggroup_tags VALUES (5,17);
    INSERT INTO taggroup_tags VALUES (5,18);
