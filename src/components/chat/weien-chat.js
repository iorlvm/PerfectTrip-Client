// 客製化調整區
/**
 * 設定釘選的圖標樣式
 * @returns icon標籤 (建議是svg格式)
 */
const pinnedIcon = () => {
    return `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pin-angle-fill" viewBox="0 0 16 16">
        <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a6 6 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707s.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a6 6 0 0 1 1.013.16l3.134-3.133a3 3 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146"/>
    </svg>
    `;
}

/**
 * 設定聊天室下拉選單
 * icon: 下拉選單的icon 可使用額外的元素包裹並指定樣式微調
 * options: 選項陣列 輸入後會對應產出相應的選項於下拉選單中
 *     text: 選項文字
 *     click: 對應的click方法 (如需跨域執行需在actionHandlers設定對應的佔位符, 於主程式中進行函式覆寫)
 *            預設傳遞兩個參數 binder物件, 點擊事件的html元素 
 *     bind: 綁定property, (根據值切換text的顯示內容, 成功設定時text的屬性會失效)
 *     slider: 綁定property (根據值的響應式滑動開關, 無設定時不出現)
 */
const chatOption = () => {
    return {
        icon: `
            <div style="transform: translateY(2px);  line-height: 1;">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                </svg>
            </div>
        `,
        options: [
            {
                text: '釘選',
                click: actionHandlers.pinnedToggle, // 請於下方的actionHandlers進行定義
                bind: {
                    property: 'pinned',
                    text: ['置頂', '取消置頂'],
                    condition: (binder) => {
                        return !binder.value.pinned;
                    }
                },
                slider: 'pinned'
            },
            {
                // text: '釘選',  // bind設定成功時, 無傳入text也可以正常運作
                click: actionHandlers.pinnedToggle,
                bind: {
                    property: 'pinned',
                    text: [
                        // 可以直接使用行內樣式做微調 
                        `
                        <div style="margin-right: 4px; transform: translateY(1px);">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pin-angle" viewBox="0 0 16 16">
                                <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a6 6 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707s.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a6 6 0 0 1 1.013.16l3.134-3.133a3 3 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146"/>
                            </svg>
                        </div>
                        <p>置頂</p>
                        `,
                        `
                        <div style="margin-right: 4px; margin-top: 1px;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pin-angle-fill" viewBox="0 0 16 16">
                                <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a6 6 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707s.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a6 6 0 0 1 1.013.16l3.134-3.133a3 3 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146m.122 2.112v-.002zm0-.002v.002a.5.5 0 0 1-.122.51L6.293 6.878a.5.5 0 0 1-.511.12H5.78l-.014-.004a5 5 0 0 0-.288-.076 5 5 0 0 0-.765-.116c-.422-.028-.836.008-1.175.15l5.51 5.509c.141-.34.177-.753.149-1.175a5 5 0 0 0-.192-1.054l-.004-.013v-.001a.5.5 0 0 1 .12-.512l3.536-3.535a.5.5 0 0 1 .532-.115l.096.022c.087.017.208.034.344.034q.172.002.343-.04L9.927 2.028q-.042.172-.04.343a1.8 1.8 0 0 0 .062.46z"/>
                            </svg>
                        </div>
                        <p>取消置頂</p>
                        `
                    ],
                    condition: (binder) => {
                        return !binder.value.pinned;
                    }
                }
            },
            {
                text: '展示1',
                click: actionHandlers.handler1
            },
            {
                text: '展示2',
                click: actionHandlers.handler2
            },
        ]
    }
}

export const actionHandlers = {
    pinnedToggle: (binder, ele) => {
        binder.value.pinned = !binder.value.pinned;
        console.dir(ele);
    },
    handler1: (binder, ele) => {
        console.log(binder);
        console.dir(ele);
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


export class WeienChat {
    /**
     * 建構子 (未來可以新增其他屬性做參數化調整)
     * @param {string} chatContainer 初始化html聊天容器的id (如做調整 也需要去scss檔進行相應的修改)
     */
    constructor(chatContainerId = 'weien-chat') {
        this.chatContainerId = chatContainerId;

        this.state = new Binder({
            searchQuerry: '',
            activeChatId: '',
        });
    }

    /**
     * 初始化啟動
     */
    init() {
        this.chatContainerElement = document.getElementById(this.chatContainerId);
        this.chatContainerElement.innerHTML = `
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
            <div class="chating-block"></div>
        `;
        this._renderChatRooms();

        // let chating = this.chatContainerElement.querySelector('.chating-block');
        this._renderScrollbar();
    }

    /**
     * 設定聊天室列表的資料
     * @param {array} chatRoomsArray 
     */
    setChatList(chatRoomsArray) {
        this.chatRoomsData.setArray(chatRoomsArray);
    }

    _renderScrollbar() {
        let scrollbars = this.chatContainerElement.querySelectorAll('.weien-chat-scroll');

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
                    scrollThumb.style.height = `${thumbHeight}px`;
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
            let transition = scrollBar.style.transition;
            const onScroll = () => {
                const contentHeight = content.scrollHeight;
                const containerHeight = container.clientHeight;
                const scrollTop = content.scrollTop;
                const thumbTop = scrollTop / contentHeight * containerHeight;
                scrollThumb.style.top = `${thumbTop}px`;
                scrollBar.style.transition = 'opacity 0.1s cubic-bezier(0.0, 0, 0.2, 1)';
                scrollBar.style.opacity = 1;

                if (timeout) {
                    clearTimeout(timeout);
                }

                timeout = setTimeout(() => {
                    scrollBar.style.transition = transition;
                    scrollBar.style.opacity = 0;
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
                        scrollThumb.style.top = `${maxTop}px`;
                    } else {
                        scrollThumb.style.top = `${newTop}px`;
                    }

                    content.scrollTop = parseInt(scrollThumb.style.top, 10) / containerHeight * contentHeight;
                }

                const onMouseUp = () => {
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                }

                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            }

            scrollThumb.addEventListener('mousedown', onThumbMouseDown);
            content.addEventListener('scroll', onScroll);
        })
    }

    _renderChatRooms() {
        this.chatListElement = this.chatContainerElement.querySelector('.chat-room-list');
        this.chatRoomsData = new ReactiveArray([], this.chatListElement, (element) => {
            let chatRooms = this._getChatRooms();
            chatRooms.forEach(chat => {
                let chatCard = this._createChatCard(chat);
                element.append(chatCard);
            });
        });
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
            <div class="chat-room-avatar"></div>
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
        let pinned = document.createElement('div');
        chat.bindElement(
            'pinned',
            pinned,
            (el, value) => {
                if (value) {
                    el.innerHTML = '<div = class="pinned-icon">' + pinnedIcon() + '</div>';
                } else {
                    el.innerHTML = '';
                }

            }
        );
        iconBlock.append(pinned);

        let unread = document.createElement('div');
        chat.bindElement(
            'unreadMessages',
            unread,
            (el, value) => {
                if (value) {
                    el.innerHTML = `<div = class="unread-count"><span>${value}</span></div>`;
                } else {
                    el.innerHTML = '';
                }
            }
        );
        iconBlock.append(unread);

        let dropdown = document.createElement('div');
        dropdown.classList.add('chat-room-dropdown');
        dropdown.innerHTML = chatOption().icon + '<div class="chat-room-dropdown-options-block"></div>';

        let dropdownOptions = dropdown.querySelector('.chat-room-dropdown-options-block');
        chatOption().options.forEach(option => {
            let dropdownOption = document.createElement('div');
            dropdownOption.classList.add('chat-room-dropdown-option');
            dropdownOption.innerHTML = `
                <div class="chat-room-dropdown-option-text">
                    ${option.text}
                </div>
            `;
            if (option.bind && this._validateOptionsBind(option.bind, chat)) {
                let text = dropdownOption.querySelector('.chat-room-dropdown-option-text');
                chat.bindElement(
                    option.bind.property,
                    text,
                    (el) => {
                        if (option.bind.condition(chat)) {
                            el.innerHTML = `${option.bind.text[0]}`;
                        } else {
                            el.innerHTML = `${option.bind.text[1]}`;
                        }
                    }
                );
            }
            if (option.slider) {
                let slider = this._createSlider();
                chat.bindElement(
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
            dropdownOption.addEventListener('click', () => {
                option.click(chat, dropdownOption);
            });
            dropdownOptions.append(dropdownOption);
        })

        iconBlock.append(dropdown);

        return chatCard;
    }

    _validateOptionsBind(bind, chat) {
        // 檢查 text 是否為陣列且長度為2
        if (!Array.isArray(bind.text) || bind.text.length !== 2) {
            console.log('bind.text格式錯誤, 需為陣列且長度為2');
            return false;
        }

        // 檢查 property 是否為字串且 options.bind[property] 確實存在
        if (typeof bind.property !== 'string' || !(bind.property in chat.value)) {
            console.log('property需為一個字串且在chat中存在');
            return false;
        }

        // 檢查 condition 是否為函數
        if (typeof bind.condition !== 'function') {
            console.log('condition需為一個函數');
            return false;
        }

        return true;
    }

    _createSlider() {
        let slider = document.createElement('div');
        slider.classList.add('chat-room-slider');
        slider.innerHTML = '<div class="chat-room-slider-button"></div>';
        return slider;
    }

    _getChatRooms() {
        return this.chatRoomsData.array.target;
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
        };
        return new Proxy(data, handler);
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
        if (this.elements[property]) {
            this.elements[property].forEach(({ element, updateFunction }) => {
                updateFunction(element, value);
            });
        }
    }
}

class ReactiveArray {
    /**
     * @param {Array} array 初始陣列值
     * @param {HTMLElement} element 更新操作的元素
     * @param {Function} update 更新方法
     */
    constructor(array, element, update = () => { }) {
        this.element = element;
        this.update = update;
        this.array = this._makeReactive(array.map(item => {
            if (typeof item === 'object' && item !== null) {
                return new Binder(item);
            } else {
                return item;
            }
        }));
    }

    // 將陣列設置為響應式
    _makeReactive(array) {
        const handler = {
            set: (target, property, value) => {
                target[property] = value;
                this.update(this.element);
                return true;
            },
        };
        return new Proxy(array, handler);
    }


    setArray(newArray) {
        this.array.target = newArray.map(item => {
            if (typeof item === 'object' && item !== null) {
                return new Binder(item);
            } else {
                return item;
            }
        });
    }

    /**
     * 插入元素到最下方  (使用場景: 當有新訊息時加入到留言的最下方)
     * @param {*} item 
     */
    append(item) {
        if (!(item instanceof Binder)) {
            item = new Binder(item);
        }
        this.array.target.push(item);
    }

    /**
     * 從列表中移除
     * @param {*} id 
     */
    deleteById(id) {
        this.array.target = this.array.target.filter(binder => binder.value.id !== id);
    }

    /**
     * 調整或是插入數據到目標前方 (使用場景: 當有新訊息時可以直接插入到非置頂聊天室的最上方)
     * @param {*} targetId 目標位置
     * @param {*} item 
     */
    insertBeforeTarget(targetId, item) {
        if (!(item instanceof Binder)) {
            item = new Binder(item);
        }
        // 移除掉與item相同id的物件 
        this.deleteById(item.value.id);
        // 插入指定的位置
        for (let i = 0; i < this.array.length; i++) {
            if (this.array.target[i].value.id === targetId) {
                this.array.target.splice(i, 0, item);
                break;
            }
        }
    }
}