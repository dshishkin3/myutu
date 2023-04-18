import type {NextPage} from 'next';
import logo from 'app/assets/images/logo.svg'
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const Index: NextPage = () => {
    return(
        <div>
            <Head>
                <title>О сервисе</title>
            </Head>
            <h1 className="text-3xl font-bold">О сервисе</h1>

            <div>
                <Image src={logo} alt='about label' width={130} height={130} />
                <p>Сервис Мьюту - проводник в мир объявлений товаров и услуг. Купить, продать, выполнить или заказать. С сервисом Мьюту это становится очень просто. Актуальные объявления со всей страны в твоем мобильном устройстве.
                    Размещай объявления товаров, предлагай свои услуги и клиент обязательно тебя найдет.
                    Здесь ты всегда сможешь найти все, что тебе нужно. Не хочешь искать? Оставь запрос на интересующий товар или услугу, продавец сам с тобой свяжется. Ты обязательно получишь уведомление, чтобы ничего не пропустить.</p>
            
                <div className='flex flex-col items-start gap-4 pt-4'>
                    <Link href='https://storage.yandexcloud.net/myutu/docs/user_agreements.pdf'>
                        <a target='_blank' rel='noreferrer' className="flex items-center gap-2">
                            <Image src="https://storage.yandexcloud.net/myutu/icons/view_doc.svg" alt='User agreement' width={20} height={20} />
                            <span aria-label="Пользовательское соглашение">Пользовательское соглашение</span>
                        </a>
                    </Link>
                    <Link href='https://storage.yandexcloud.net/myutu/docs/politica_konfidecialnosti.pdf'>
                        <a target='_blank' rel='noreferrer' className="flex items-center gap-2">
                            <Image src="https://storage.yandexcloud.net/myutu/icons/view_doc.svg" alt='Privacy policy' width={20} height={20} />
                            <span aria-label="Пользовательское соглашение">Политика конфиденциальности</span>
                        </a>
                    </Link>
                    <Link href='https://storage.yandexcloud.net/myutu/docs/dogovor_oferti.pdf'>
                        <a target='_blank' rel='noreferrer' className="flex items-center gap-2">
                            <Image src="https://storage.yandexcloud.net/myutu/icons/view_doc.svg" alt='Offer Agreement' width={20} height={20} />
                            <span aria-label="Пользовательское соглашение">Договор оферты</span>
                        </a>
                    </Link>
                </div>

                <div className="mt-4" aria-label="Контакты">
                    <span className="block text-2xl font-bold">Контакты:</span>
                    <p className="mt-2">
                        Фактический адрес: 428003, Чебоксары, ул. Академика Крылова д. 11 пом. 1<br />
                        Электронная почта: shop@shop.ru.<br />
                        Телефоны: 8-906-132-78-63.<br />
                        Реквизиты:<br />
                        ООО Экспа Софтвар.<br />
                        ИНН    2130124339<br />
                        КПП    213001001<br />
                        ОГРН/ОГРНИП    1132130011090<br />
                        Счёт    40702810275000012709<br />

                        БИК    049706609<br />
                        Наименование Банка    ЧУВАШСКОЕ ОТДЕЛЕНИЕ N8613 ПАО СБЕРБАНК<br />
                        К/С    30101810300000000609<br />
                        Юридический адрес: 428003, Чебоксары, ул. Академика Крылова д. 11 пом. 1.<br />
                        Тел. : 8-906-132-78-63.
                    </p>
                </div>

                <div className="mt-4" aria-label="Описание сферы деятельности">
                    <span className="block text-2xl font-bold">Описание сферы деятельности:</span>
                    <p className="mt-2">Электронная площадка, которая продаёт товары и услуги разных продавцов через интернет, путем предоставления информации о продукте или услуге третьих лиц.</p>
                </div>

                <div className="mt-4" aria-label="Способ оплаты">
                    <span className="block text-2xl font-bold">Способ оплаты:</span>
                    <span className="block text-xl font-medium mt-2">Банковская карта:</span>
                    <p className="mt-2">Для выбора оплаты товара с помощью банковской карты на соответствующей странице
                        необходимо нажать кнопку Оплата заказа банковской картой. Оплата происходит через ПАО
                        СБЕРБАНК с использованием банковских карт следующих платёжных систем:</p>
                    <div className="flex items-center mt-2 gap-4 ml-5">
                        <p className="text-xl font-regular">- МИР</p>
                        <Image src="https://storage.yandexcloud.net/myutu/icons/cards/mir.svg" alt='mir' width={50} height={20} />
                    </div>
                    <div className="flex items-center mt-2 gap-4 ml-5">
                        <p className="text-xl font-regular">- VISA International</p>
                        <Image src="https://storage.yandexcloud.net/myutu/icons/cards/visa.svg" alt='VISA' width={40} height={20} />
                    </div>
                    <div className="flex items-center mt-2 gap-4 ml-5">
                        <p className="text-xl font-regular">- Mastercard Worldwide</p>
                        <Image src="https://storage.yandexcloud.net/myutu/icons/cards/mastercard.svg" alt='Mastercard' width={50} height={20} />
                    </div>
                </div>

                <div className="mt-4" aria-label="Описание возврата товара и услуг">
                    <span className="block text-2xl font-bold">Описание возврата товара и услуг:</span>
                    <p className="mt-2">При получении товара не надлежащего качества, возврат производиться в соответствии с законом &quot;О защите прав потребителей&quot;, при этом в соответствии с Пользовательским соглашение Администрация Приложения ответственность не несет. Возврат осуществляется напрямую Поставщику.В случае неразмещения оплаченной  услуги или предложения Пользователя в Приложении по технической причине, возникшей вследствие обстоятельств, за которые отвечает Администрация Приложения, уплаченные Пользователем денежные средства подлежат возврату.</p>
                </div>

                <div className="mt-4" aria-label="Условия доставки товара">
                    <span className="block text-2xl font-bold">Условия доставки товара:</span>
                    <p className="mt-2">Условия доставки товара не предусмотрено.</p>
                </div>

                <div className="mt-4" aria-label="Описание процесса передачи данных">
                    <span className="block text-2xl font-bold">Описание процесса передачи данных:</span>
                    <p className="mt-2">Для оплаты (ввода реквизитов Вашей карты) Вы будете перенаправлены на платёжный шлюз
                        ПАО СБЕРБАНК. Соединение с платёжным шлюзом и передача информации осуществляется в
                        защищённом режиме с использованием протокола шифрования SSL. В случае если Ваш банк
                        поддерживает технологию безопасного проведения интернет-платежей Veriﬁed By Visa,
                        MasterCard SecureCode, MIR Accept, J-Secure для проведения платежа также может
                        потребоваться ввод специального пароля.<br />
                        Настоящий сайт поддерживает 256-битное шифрование. Конфиденциальность сообщаемой
                        персональной информации обеспечивается ПАО СБЕРБАНК. Введённая информация не будет
                        предоставлена третьим лицам за исключением случаев, предусмотренных законодательством
                        РФ. Проведение платежей по банковским картам осуществляется в строгом соответствии с
                        требованиями платёжных систем МИР, Visa Int., MasterCard Europe Sprl.</p>
                </div>

                <div className="mt-4" aria-label="Информация о разработчике">
                    <span className="block text-2xl font-bold">Информация о разработчике</span>
                    <a href="https://ekspa.io" className="mt-2 text-sky-600">Ссылка на сайт разработчика</a>
                    <span className="block text-base">Экспа Софтвар, ИНН: 2130124339</span>
                    <span className="block text-base">Умные цифровые решения для автоматизации и роста бизнеса.</span>
                    <span className="block text-base text-slate-500 text-center mt-10">Версия 1.0.0</span>
                </div>
            </div>
        </div>
    );
};

export default Index;