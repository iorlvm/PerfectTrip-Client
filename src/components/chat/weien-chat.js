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
 * text: 選項文字
 * click: 對應的click方法 (如需跨域執行需在clickHandlers設定對應的佔位符, 於主程式中進行函式覆寫)
 * slider: 是否出現滑動開關以及綁定的property名稱 (默認不出現, 僅能進行true/flase切換)
 * @returns 
 */
const chatOption = () => {
    return {
        icon: `
            <div style="transform: translateY(3px);">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                </svg>
            </div>
        `,
        options: [
            {
                text: '選項1',
                click: function (id) {
                    // TODO: 去問老師為什麼無法用箭頭函式?
                    console.log(id + ' : ' + this.text + ' <- 無須跨域執行的函式');
                }
            },
            {
                text: '釘選',
                click: clickHandlers.handler1,
                slider: 'pinned'
            },
            {
                text: '選項3',
                click: clickHandlers.handler2
            },
        ]
    }
}


export const clickHandlers = {
    handler1: (id, ele) => {
        console.log('chatId : ' + id);
        console.dir(ele);
    },
    handler2: (id, ele) => {
        console.log('chatId : ' + id);
        console.log(ele.innerHTML);
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
                <div class="chat-room-list"></div>
            </div>
            <div class="vertical-divider"></div>
            <div class="chating-block"></div>
        `;
        this._renderChatRooms();

        // let chating = this.chatContainerElement.querySelector('.chating-block');
    }

    /**
     * 設定聊天室列表的資料
     * @param {array} chatRoomsArray 
     */
    setChatList(chatRoomsArray) {
        this.chatRoomsData.setArray(chatRoomsArray);
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
            this.state.data.activeChatId = chat.data.chatId;
        });
        this.state.bindElement(
            'activeChatId',
            chatCard,
            (el, value) => {
                if (value === chat.data.chatId) {
                    el.classList.add('active-chat');
                } else {
                    el.classList.remove('active-chat');
                }
            }
        );

        chatCard.innerHTML = `
            <div class="chat-room-avatar">
                <img src="" alt="">
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

        let chatAvatar = chatCard.querySelector('.chat-room-avatar img');
        chat.bindElement(
            'avatar',
            chatAvatar,
            (el, value) => {
                el.src = value;
            }
        );
        chat.bindElement(
            'name',
            chatAvatar,
            (el, value) => {
                el.alt = value;
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
            dropdownOption.innerHTML = `<div>${option.text}</div>`;
            if (option.slider) {
                let slider = this._createSlider(option);
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
                dropdownOption.addEventListener('click', () => {
                    option.click(chat.data.chatId, slider);
                    chat.data[option.slider] = !chat.data[option.slider];
                });
                dropdownOption.append(slider);
            } else {
                dropdownOption.addEventListener('click', () => {
                    option.click(chat.data.chatId, dropdownOption);
                });
            }
            dropdownOptions.append(dropdownOption);
        })

        iconBlock.append(dropdown);

        return chatCard;
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
    constructor(data) {
        this.data = this._makeReactive(data);
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

        updateFunction(element, this.data[property]);

        if (element.tagName === "INPUT") {
            element.value = this.data[property];
            element.addEventListener("input", (event) => {
                this.data[property] = event.target.value;
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
        this.array.target = this.array.target.filter(binder => binder.data.id !== id);
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
        this.deleteById(item.data.id);
        // 插入指定的位置
        for (let i = 0; i < this.array.length; i++) {
            if (this.array.target[i].data.id === targetId) {
                this.array.target.splice(i, 0, item);
                break;
            }
        }
    }
}