My minimal initial template with package:
- Nuxt
- Nuxt/UI
- TypeORM
- mssql
- bcrypt
- next-auth
- @sidebase/nuxt-auth

Шаблон для дальнейшего использования в моих проектах.
Содержит:
- аутентификация (логин/пароль или по учетной записи GitHub)
- CRUD в БД MSSQL пользователей
- поддержка ролей пользователей (admin/user) для разграничения доступа (все pages в ветке /protected доступны только пользователю с ролью admin)
- базовый шаблон Header и Footer, а также шаблон аватарки пользователя с контекстным меню (блок setting доступен только admin )