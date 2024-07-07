// 客製化調整區
/**
 * 設定釘選的圖標樣式
 * @returns icon標籤
 */
const pinnedIcon = () => {
    return {
        placement: 'avatar',  // 僅接受三種參數傳入 'avatar', 'text', 'both' (未設定時預設為'avatar', 輸入這三個參數以外的數值為不顯示)
        icon: '<i class="bi bi-pin-angle-fill"></i>'
    }
}

/**
 * 設定提醒開關的圖標樣式
 * @returns icon標籤
 */
const notifIcon = () => {
    return {
        on: '<i class="bi bi-bell-fill"></i>',
        off: '<i class="bi bi-bell-slash-fill"></i>'
    }
}

/**
 * 設定聊天室下拉選單
 * icon: 下拉選單的icon 可使用額外的元素包裹並指定樣式微調
 * options: 選項陣列 輸入後會對應產出相應的選項於下拉選單中
 *     text: 選項文字
 *     click: 對應的click方法 (如需跨域執行需在actionHandlers設定對應的佔位符, 於主程式中進行函式覆寫)
 *            預設傳遞兩個參數 binder物件, 事件物件 
 *     bind: 根據值切換text的顯示內容 (成功設定時text的屬性會失效)
 *         text: [] 字串陣列, 長度為2
 *         property: 根據具體哪個property進行切換
 *         condition: 回傳值為boolean的判斷函式
 *     slider: 綁定property (根據值的響應式滑動開關, 無設定時不出現)
 */
const chatListOptionSettings = () => {
    return {
        icon: `
            <div style="transform: translateY(1px);">
                <i class="bi bi-chevron-down"></i>
            </div>
        `,
        // 可以在這裡指定下拉欄位的寬度以及邊距, 不建議使用百分比指定寬度, 父容器的寬度非常小(約1em)
        width: 'calc(4em + 45px)',      // 未指定時的預設值: width: 5em;
        padding: '12px 10px 12px 12px',    // 未指定時的預設值: padding: '10px';
        options: [
            {
                text: '釘選',
                click: actionHandlers.pinnedToggle, // 請於下方的actionHandlers進行定義
                bind: {
                    property: 'pinned',
                    text: ['對話置頂', '取消置頂'],
                    condition: (binder) => {
                        return !binder.value.pinned;
                    }
                },
                slider: 'pinned' // 可以與bind同時使用 (如果有需要的話)
            },
            {
                // text: '釘選',  // bind設定成功時, 無傳入text也可以正常運作
                click: actionHandlers.pinnedToggle,
                bind: {
                    property: 'pinned',
                    text: [
                        // 可以直接使用行內樣式做微調 
                        `
                            <i class="bi bi-pin" style="margin-right: 8px; transform: translateY(1px); font-size:16px"></i>
                            <p>對話置頂</p>
                        `,
                        `
                            <i class="bi bi-pin-angle" style="margin-right: 8px; transform: translateY(-1px); font-size:16px"></i>
                            <p>取消置頂</p>
                        `
                    ],
                    condition: (binder) => {
                        return !binder.value.pinned;
                    }
                }
            },
            {
                text: 'log回傳值',
                click: actionHandlers.handler1
            },
            {
                text: '外部定義測試',
                click: actionHandlers.handler2
            },
        ]
    }
}

/**
 * 設定聊天室下拉選單
 * icon: 下拉選單的icon 可使用額外的元素包裹並指定樣式微調
 * options: 選項陣列 輸入後會對應產出相應的選項於下拉選單中
 *     text: 選項文字
 *     click: 對應的click方法 (如需跨域執行需在actionHandlers設定對應的佔位符, 於主程式中進行函式覆寫)
 *            預設傳遞兩個參數 binder物件, 事件物件 
 *     bind: 根據值切換text的顯示內容 (成功設定時text的屬性會失效)
 *         text: [] 字串陣列, 長度為2
 *         property: 根據具體哪個property進行切換
 *         condition: 回傳值為boolean的判斷函式
 *     slider: 綁定property (根據值的響應式滑動開關, 無設定時不出現)
 */
const chatingOptionSettings = () => {
    return {
        icon: `
            <div style="transform: translateY(1px);">
                <i class="bi bi-chevron-down"></i>
            </div>
        `,
        // 可以在這裡指定下拉欄位的寬度以及邊距, 不建議使用百分比指定寬度, 父容器的寬度非常小(約1em)
        width: 'calc(4em + 45px)',      // 未指定時的預設值: width: 5em;
        padding: '12px 10px 12px 12px',    // 未指定時的預設值: padding: '10px';
        options: [
            {
                text: '釘選',
                click: actionHandlers.pinnedToggle, // 請於下方的actionHandlers進行定義
                bind: {
                    property: 'pinned',
                    text: ['對話置頂', '取消置頂'],
                    condition: (binder) => {
                        return !binder.value.pinned;
                    }
                },
                slider: 'pinned' // 可以與bind同時使用 (如果有需要的話)
            },
            {
                // text: '釘選',  // bind設定成功時, 無傳入text也可以正常運作
                click: actionHandlers.pinnedToggle,
                bind: {
                    property: 'pinned',
                    text: [
                        // 可以直接使用行內樣式做微調 
                        `
                            <i class="bi bi-pin" style="margin-right: 8px; transform: translateY(1px); font-size:16px"></i>
                            <p>對話置頂</p>
                        `,
                        `
                            <i class="bi bi-pin-angle" style="margin-right: 8px; transform: translateY(-1px); font-size:16px"></i>
                            <p>取消置頂</p>
                        `
                    ],
                    condition: (binder) => {
                        return !binder.value.pinned;
                    }
                }
            },
            {
                text: 'log回傳值',
                click: actionHandlers.handler1
            },
            {
                text: '外部定義測試',
                click: actionHandlers.handler2
            },
        ]
    }
}

export const actionHandlers = {
    pinnedToggle: (binder) => {
        binder.value.pinned = !binder.value.pinned;
    },
    getChatSessionData: (chatId) => {
        console.log('(chatId: ' + chatId + ') => { 請改寫這個方法, 並回傳符合格式的數據組件才能正常運作 }');
        return {};
    },
    handler1: (binder, e) => {
        console.log(binder);
        console.log(e.target);
    },
    handler2: () => {
        console.log('handler2預設方法');
    }
};


/**
 * 設定聊天室的日期時間格式 (可依造需求進行改寫)
 * @param {string} dateStr 日期時間格式的字串
 * @returns 格式化後的值
 */
const formatChatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-TW', { month: '2-digit', day: '2-digit' });
};

/**
 * 設定訊息的日期時間格式 (可依造需求進行改寫)
 * @param {string} dateStr 日期時間格式的字串
 * @returns 格式化後的值
 */
const formatMessagesDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit', hour12: false })
}


/**
 * 聊天室物件
 */
export class WeienChat {
    /**
     * 建構子 (未來可以新增其他屬性做參數化調整)
     * @param {*} chatUserId 登入的使用者id
     * @param {string} activeChatId 初始化生效的聊天室id (如需要預設開啟某個聊天室時進行傳遞) 
     * @param {string} chatContainer 初始化html聊天容器的id (如做調整 也需要去scss檔進行相應的修改)
     */
    constructor(chatUserId, activeChatId = '', chatContainerId = 'weien-chat') {
        this.chatUserId = chatUserId;
        this.chatContainerId = chatContainerId;
        this._preChatId = '';

        this.state = new Binder({
            searchQuerry: '',
            activeChatId: activeChatId,
            isMobile: false,
        });

        this._chatSessionData = null;
        this._chatRoomsData = [];
        this._dropdownVisible = {
            isOpen: false,
            target: null
        };

    }

    /**
     * 初始化啟動
     */
    init() {
        this.chatContainerElement = document.getElementById(this.chatContainerId);
        this.state.bindElement('isMobile', this.chatContainerElement, (el, value) => {
            if (value) {
                // TODO 手機板顯示
                el.innerHTML = `
                    <div class="chat-list-block chat-show-mode-mobile">
                        <div class="chat-list-bar">
                            <input>
                        </div>
                        <div class="weien-chat-scroll">
                            <div class="chat-room-list weien-chat-scroll-content"></div>
                            <div class="weien-chat-scroll-bar">
                                <div class="weien-chat-scroll-thumb"></div>
                            </div>
                        </div>
                    </div>
                    <div class="weien-chating-block mobile-mode-display-none"></div>
                `;
            } else {
                el.innerHTML = `
                    <div class="chat-list-block">
                        <div class="chat-list-bar">
                            <input>
                        </div>
                        <div class="weien-chat-scroll">
                            <div class="chat-room-list weien-chat-scroll-content"></div>
                            <div class="weien-chat-scroll-bar">
                                <div class="weien-chat-scroll-thumb"></div>
                            </div>
                        </div>
                    </div>
                    <div class="vertical-divider"></div>
                    <div class="weien-chating-block"></div>
                `;
            }
        })
        this._renderChatRooms();
        this._renderChatingBlock();
    }

    /**
     * 設定聊天室列表的資料
     * @param {array} chatRoomsArray 
     */
    setChatList(chatRoomsArray) {
        this._chatRoomsData = chatRoomsArray.map(item => {
            if (typeof item === 'object' && item !== null) {
                return new Binder(item);
            } else {
                return item;
            }
        });

        this._renderChatRooms();
    }

    /**
     * 取得聊天室列表的響應式資料陣列
     * @returns 聊天室列表陣列資料
     */
    getChatList() {
        return this._chatRoomsData;
    }

    /**
     * 將聊天室新增到列表尾端
     * @param {object} chatRoom
     */
    appendChat(chatRoom) {
        if (typeof chatRoom !== 'object' || chatRoom === null) return;
        let listContainer = this.chatContainerElement.querySelector('.chat-room-list');

        let chat = new Binder(chatRoom);
        let chatChard = this._createChatCard(chat);
        listContainer.append(chatChard);
        this._resizeScrollbar(listContainer);
    }

    _renderChatingBlock() {
        let chatingBlock = this.chatContainerElement.querySelector('.weien-chating-block');
        this.state.bindElement(
            'activeChatId',
            chatingBlock,
            (el, value) => {
                if (value === this._preChatId) return;
                this._preChatId = value;
                if (value == '') {
                    el.innerHTML = '';
                } else {
                    // 執行取得聊天資料
                    this._chatSessionData = new Binder(actionHandlers.getChatSessionData(value));
                    el.innerHTML = `
                        <div class="weien-chating-header">
                            <div class="weien-chating-name-block">
                                <div class="weien-chating-name"></div>
                                <div class="weien-chating-participants"></div>
                            </div>
                            <div class="weien-notif-icon"></div>
                            <div style="flex:1"></div>
                            <div class="weien-chating-state-tags"></div>
                            <div class="weien-chating-dropdown"></div>
                        </div>
                        <div class="weien-chat-scroll">
                            <div class="weien-messages-list weien-chat-scroll-content">1234</div>
                            <div class="weien-chat-scroll-bar">
                                <div class="weien-chat-scroll-thumb"></div>
                            </div>
                        </div>
                        <div class="weien-chating-input-block">
                            <textarea class="weien-message-input" rows="3" maxlength="200" placeholder="請輸入您的訊息"></textarea>
                            <div>123</div>
                        </div>
                    `;
                    this._renderChatingHeader(el.querySelector('.weien-chating-header'));
                    this._renderMessagesList(el.querySelector('.weien-messages-list'));
                    this._renderScrollbar(el.querySelectorAll('.weien-chat-scroll'));
                    this._addInputBlockEventListener();
                }
            }
        )
    }

    _renderChatingHeader(chatingHeader) {
        let chatingName = chatingHeader.querySelector('.weien-chating-name');
        this._chatSessionData.bindElement(
            'chatName',
            chatingName,
            (el, value) => {
                let len = this._chatSessionData.value.participants.length;
                let text;
                if (value) {
                    text = value;
                } else if (len > 2) {
                    text = '會話群組';
                } else if (len === 2) {
                    text = this._getChatingWith();
                } else {
                    text = 'ERROR - 這個聊天室只有一個參與者';
                }
                el.textContent = text;
                // TODO: 根據chatId同步更新list裡面的資料
            }
        );

        let participants = chatingHeader.querySelector('.weien-chating-participants');
        this._chatSessionData.bindElement(
            'participants',
            participants,
            (el, value) => {
                if (value.length > 2) {
                    el.textContent = `(${value.length})`;
                } else {
                    el.textContent = '';
                }
                // TODO: 根據chatId同步更新list裡面的資料
            }
        );
        let nameBlock = chatingHeader.querySelector('.weien-chating-name-block');
        nameBlock.addEventListener('click', () => {
            // TODO: 新增點擊後顯示名稱詳細訊息畫面
        })

        this._chatSessionData.bindElement(
            'participants',
            nameBlock, // 需要綁定的元素還沒創 之後記得改
            (el, value) => {
                // TODO: 根據參與者數量修改點擊名稱後顯示的畫面
                if (value.length > 2) {
                    // 顯示參與者列表
                } else {
                    // 顯示對方的詳細訊息
                }
            }
        );

        let notif = chatingHeader.querySelector('.weien-notif-icon');
        this._chatSessionData.bindElement(
            'notifSettings',
            notif,
            (el, value) => {
                if (value === 'on') {
                    el.innerHTML = notifIcon().on;
                } else if (value === 'off') {
                    el.innerHTML = notifIcon().off;
                } else {
                    el.style = "display: none;";
                }
            }
        );

        // TODO: 增加點擊切換提醒開關的事件

        let dropdownBlock = chatingHeader.querySelector('.weien-chating-dropdown');
        let dropdown = this._createDropdown(this._chatSessionData, chatingOptionSettings, false);
        dropdownBlock.append(dropdown);
    }

    _getChatingWith() {
        let res = '';
        this._chatSessionData.value.participants.forEach(participant => {
            if (this.chatUserId !== participant.userId) {
                res = participant.name;
                return;
            }
        });
        return res;
    }

    _renderMessagesList(messagesList) {
        console.log(messagesList);
    }

    _addInputBlockEventListener() {

    }

    _resizeScrollbar(element) {
        const scrollBar = element.closest('.weien-chat-scroll');
        const content = scrollBar.querySelector('.weien-chat-scroll-content');
        const scrollThumb = scrollBar.querySelector('.weien-chat-scroll-thumb');
        const contentHeight = content.scrollHeight;
        const containerHeight = scrollBar.clientHeight;
        if (contentHeight <= containerHeight) {
            scrollThumb.style.height = 0;
        } else {
            const thumbHeight = containerHeight / contentHeight * containerHeight;
            scrollThumb.style.height = `${thumbHeight - 3}px`; // 避免底部的1px圓角被吃掉
        }
    }

    _renderScrollbar(scrollbars = this.chatContainerElement.querySelectorAll('.weien-chat-scroll')) {
        // 監聽滾動條父元素的大小變化 動態更新scroll-bar大小
        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                let parent = entry.target;
                const parentHeight = parent.clientHeight;

                // 統計scroll容器以外, 所有子元素的高度
                let totalHeight = 0;
                Array.from(parent.children).forEach(child => {
                    if (!child.classList.contains('weien-chat-scroll')) {
                        totalHeight += child.offsetHeight;
                    }
                });
                let container = parent.querySelector('.weien-chat-scroll');
                const content = container.querySelector('.weien-chat-scroll-content');
                const scrollThumb = container.querySelector('.weien-chat-scroll-thumb');

                // 計算剩餘空間, 設定scroll容器大小
                container.style.height = `${parentHeight - totalHeight}px`;

                // 設定thumb的大小
                const contentHeight = content.scrollHeight;
                const containerHeight = container.clientHeight;
                if (contentHeight <= containerHeight) {
                    scrollThumb.style.height = 0;
                } else {
                    const thumbHeight = containerHeight / contentHeight * containerHeight;
                    scrollThumb.style.height = `${thumbHeight - 3}px`; // 避免底部的1px圓角被吃掉
                }

            }
        });

        scrollbars.forEach(container => {
            const parent = container.parentElement;
            const content = container.querySelector('.weien-chat-scroll-content');
            const scrollBar = container.querySelector('.weien-chat-scroll-bar');
            const scrollThumb = container.querySelector('.weien-chat-scroll-thumb');
            resizeObserver.observe(parent);

            let timeout;
            const onScroll = () => {
                const contentHeight = content.scrollHeight;
                const containerHeight = container.clientHeight;
                const scrollTop = content.scrollTop;
                const thumbTop = scrollTop / contentHeight * containerHeight;
                scrollThumb.style.top = `${thumbTop + 1}px`; // 參數微調, 不希望完全觸頂
                scrollBar.classList.add('on-scroll');

                if (timeout) {
                    clearTimeout(timeout);
                }

                timeout = setTimeout(() => {
                    scrollBar.classList.remove('on-scroll');
                }, 1500);
            }

            const onThumbMouseDown = (event) => {
                event.preventDefault();
                const startY = event.clientY;
                const startTop = parseInt(scrollThumb.style.top, 10) || 0;

                const onMouseMove = (event) => {
                    const deltaY = event.clientY - startY;
                    const newTop = startTop + deltaY;
                    const containerHeight = container.clientHeight;
                    const contentHeight = content.scrollHeight;
                    const maxTop = containerHeight - scrollThumb.clientHeight;

                    if (newTop < 0) {
                        scrollThumb.style.top = '0px';
                    } else if (newTop > maxTop) {
                        scrollThumb.style.top = `${maxTop - 2}px`; // 參數微調, 不希望完全觸底
                    } else {
                        scrollThumb.style.top = `${newTop}px`;
                    }

                    content.scrollTop = parseInt(scrollThumb.style.top, 10) / containerHeight * contentHeight;
                }

                const onMouseUp = () => {
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                    timeout = setTimeout(() => {
                        scrollBar.classList.remove('on-scroll');
                    }, 180);
                }

                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            }

            scrollThumb.addEventListener('mousedown', onThumbMouseDown);
            content.addEventListener('scroll', onScroll);
        })
    }

    _renderChatRooms() {
        if (this._chatRoomsData.length === 0) return;
        let listContainer = this.chatContainerElement.querySelector('.chat-room-list');

        this._chatRoomsData.forEach(chat => {
            let chatCard = this._createChatCard(chat);
            listContainer.append(chatCard);
        });
        this._renderScrollbar();
    }

    _createChatCard(chat) {
        let chatCard = document.createElement('div');
        chatCard.classList.add('chat-room-card');
        chatCard.addEventListener('click', () => {
            this.state.value.activeChatId = chat.value.chatId;
        });
        this.state.bindElement(
            'activeChatId',
            chatCard,
            (el, value) => {
                if (value === chat.value.chatId) {
                    el.classList.add('active-chat');
                } else {
                    el.classList.remove('active-chat');
                }
            }
        );

        chatCard.innerHTML = `
            <div class="chat-room-avatar">
                <div class="chat-room-avatar-pinned"></div>
            </div>
            <div class="chat-room-overview">
                <div class="chat-room-header">
                    <div class="chat-room-name"></div>
                    <div class="chat-room-date"></div>
                </div>
                <div class="chat-messages-preview">
                    <p class="chat-room-details"></p>
                    <div class="chat-room-icon-block"></div>
                </div>
            </div>
        `

        let chatAvatar = chatCard.querySelector('.chat-room-avatar');

        chat.bindElement(
            'avatar',
            chatAvatar,
            (el, value) => {
                el.style.backgroundImage = `url(${value})`;
            }
        );

        let chatName = chatCard.querySelector('.chat-room-name');
        chat.bindElement(
            'name',
            chatName
        );

        let chatDate = chatCard.querySelector('.chat-room-date');
        chat.bindElement(
            'date',
            chatDate,
            (el, value) => {
                el.textContent = formatChatDate(value);
            }
        );

        let MessagePreview = chatCard.querySelector('.chat-room-details');
        chat.bindElement(
            'lastMessage',
            MessagePreview
        )

        let iconBlock = chatCard.querySelector('.chat-room-icon-block');

        let placement = pinnedIcon().placement;
        if (placement == null || placement == 'avatar' || placement == 'both') {
            // 需顯示到頭像下方
            let pinned = chatAvatar.querySelector('.chat-room-avatar-pinned');
            chat.bindElement(
                'pinned',
                pinned,
                (el, value) => {
                    if (value) {
                        el.innerHTML = '<div = class="pinned-icon">' + pinnedIcon().icon + '</div>'
                    } else {
                        el.innerHTML = '';
                    }

                }
            );
        }

        if (placement != null && (placement == 'text' || placement == 'both')) {
            // 需顯示到文字框
            let pinned = document.createElement('div');
            chat.bindElement(
                'pinned',
                pinned,
                (el, value) => {
                    if (value) {
                        el.innerHTML = '<div = class="pinned-icon">' + pinnedIcon().icon + '</div>';
                    } else {
                        el.innerHTML = '';
                    }

                }
            );
            iconBlock.append(pinned);
        }


        let unread = document.createElement('div');
        chat.bindElement(
            'unreadMessages',
            unread,
            (el, value) => {
                if (value) {
                    el.innerHTML = `<div = class="unread-count"><span>${value < 1000 ? value : '999+'}</span></div>`;
                } else {
                    el.innerHTML = '';
                }
            }
        );
        iconBlock.append(unread);


        let dropdown = this._createDropdown(chat, chatListOptionSettings, true);
        iconBlock.append(dropdown);

        return chatCard;
    }

    _validateOptionsBind(bind, binder) {
        // 檢查 text 是否為陣列且長度為2
        if (!Array.isArray(bind.text) || bind.text.length !== 2) {
            console.log('bind.text格式錯誤, 需為陣列且長度為2');
            return false;
        }

        // 檢查 property 是否為字串且 options.bind[property] 確實存在
        if (typeof bind.property !== 'string' || !(bind.property in binder.value)) {
            console.log('property需為一個字串且在binder中存在');
            return false;
        }

        // 檢查 condition 是否為函數
        if (typeof bind.condition !== 'function') {
            console.log('condition需為一個函數');
            return false;
        }

        return true;
    }

    _createDropdown(binder, chatOption, isLeft = true) {
        let dropdown = document.createElement('div');
        dropdown.classList.add('chat-room-dropdown');
        dropdown.innerHTML = `<div class="chat-room-dropdown-options-icon">${chatOption().icon}</div> <div class="chat-room-dropdown-options-block"></div>`;
        let dropdownOptions = dropdown.querySelector('.chat-room-dropdown-options-block');
        let dropdownIcon = dropdown.querySelector('.chat-room-dropdown-options-icon');

        const closeDropdown = (ele) => {
            if (ele.parentElement) {
                ele.parentElement.classList.remove('dropdown-display-block');
            } else {
                dropdown.classList.remove('dropdown-display-block');
            }
            if (ele.nextElementSibling) {
                ele.nextElementSibling.classList.remove('dropdown-display-block');
            } else {
                dropdownOptions.classList.remove('dropdown-display-block');
            }
            this._dropdownVisible.isOpen = false;
        };

        const openDropdown = e => {
            e.stopPropagation();
            dropdown.classList.add('dropdown-display-block');
            dropdownOptions.classList.add('dropdown-display-block');

            const dropdownRect = dropdown.getBoundingClientRect();
            const optionsRect = dropdownOptions.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            if (dropdownRect.bottom + optionsRect.height > viewportHeight) {
                dropdownOptions.style.top = `calc(0% - ${optionsRect.height}px + 1em)`;
            } else {
                dropdownOptions.style.top = 'calc(100% + 5px)';
            }
            this._dropdownVisible.isOpen = true;
            this._dropdownVisible.target = e.currentTarget;
        }

        // 新增判斷底下空間是否足夠的事件
        dropdownIcon.addEventListener('click', e => {
            if (this._dropdownVisible.isOpen && this._dropdownVisible.target === e.currentTarget) {
                closeDropdown(this._dropdownVisible.target);
            } else if (this._dropdownVisible.isOpen) {
                closeDropdown(this._dropdownVisible.target);
                openDropdown(e);
            } else {
                openDropdown(e);
            }
        });

        document.addEventListener('click', closeDropdown);

        // 判斷是否有設定寬度參數
        let width = chatOption().width;
        if (width) {
            if (isLeft) {
                this.chatContainerElement.style.setProperty('--weien-chat-room-card-dropdown-left-option-size', width);
            } else {
                this.chatContainerElement.style.setProperty('--weien-chat-room-card-dropdown-right-option-size', width);
            }
        }
        // 判斷是否有設定邊距大小
        let padding = chatOption().padding;
        if (padding) {
            if (isLeft) {
                this.chatContainerElement.style.setProperty('--weien-chat-room-card-dropdown-left-option-padding', padding);
            } else {
                this.chatContainerElement.style.setProperty('--weien-chat-room-card-dropdown-right-option-padding', padding);
            }

        }

        chatOption().options.forEach(option => {
            let dropdownOption = document.createElement('div');
            dropdownOption.classList.add('chat-room-dropdown-option');
            dropdownOption.innerHTML = `
                <div class="chat-room-dropdown-option-text">
                    ${option.text}
                </div>
            `;
            if (option.bind && this._validateOptionsBind(option.bind, binder)) {
                let text = dropdownOption.querySelector('.chat-room-dropdown-option-text');
                binder.bindElement(
                    option.bind.property,
                    text,
                    (el) => {
                        if (option.bind.condition(binder)) {
                            el.innerHTML = `${option.bind.text[0]}`;
                        } else {
                            el.innerHTML = `${option.bind.text[1]}`;
                        }
                    }
                );
            }
            if (option.slider) {
                let slider = this._createSlider();
                binder.bindElement(
                    option.slider,
                    slider,
                    (el, value) => {
                        if (value) {
                            el.classList.add('chat-room-slider-on');
                        } else {
                            el.classList.remove('chat-room-slider-on');
                        }
                    }
                )
                dropdownOption.append(slider);
            }
            dropdownOption.addEventListener('click', e => {
                option.click(binder, e);
            });
            dropdownOptions.append(dropdownOption);
        })
        return dropdown;
    }

    _createSlider() {
        let slider = document.createElement('div');
        slider.classList.add('chat-room-slider');
        slider.innerHTML = '<div class="chat-room-slider-button"></div>';
        return slider;
    }
}

// 對html元素與變數進行響應式綁定
class Binder {
    constructor(value) {
        this.value = this._makeReactive(value);
    }

    _makeReactive(data) {
        const handler = {
            set: (target, property, value) => {
                target[property] = value;
                this._updateElements(property, value);
                return true;
            },
            get: (target, property) => {
                if (Array.isArray(target) && this._isArrayMethod(property)) {
                    return (...args) => {
                        const result = Array.prototype[property].apply(target, args);
                        this._updateElements(property, target);
                        return result;
                    };
                }
                return target[property];
            }
        };
        return new Proxy(data, handler);
    }

    _isArrayMethod(property) {
        return ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].includes(property);
    }

    bindElement(property, element, updateFunction = (el, value) => { el.textContent = value; }) {
        if (!this.elements) {
            this.elements = {};
        }
        if (!this.elements[property]) {
            this.elements[property] = [];
        }
        this.elements[property].push({ element, updateFunction });

        updateFunction(element, this.value[property]);

        if (element.tagName === "INPUT") {
            element.value = this.value[property];
            element.addEventListener("input", (event) => {
                this.value[property] = event.target.value;
            });
        }
    }

    _updateElements(property, value) {
        if (this.elements && this.elements[property]) {
            this.elements[property].forEach(({ element, updateFunction }) => {
                updateFunction(element, value);
            });
        }
    }
}