export class WeienChat {
    /**
     * 建構子 (未來可以新增其他屬性做參數化調整)
     * @param {string} chatContainer 初始化html聊天容器的id (如做調整 也需要去scss檔進行相應的修改)
     */
    constructor(chatContainer = 'weien-chat') {
        this.chatContainer = chatContainer;
    }

    /**
     * 初始化啟動
     */
    init() {
        this.chatContainerElement = document.getElementById(this.chatContainer);
        this.chatContainerElement.innerHTML = `
            <div class="chat-list-block"></div>
            <div class="vertical-divider"></div>
            <div class="chating-block"></div>
        `;
        this.chatListElement = this.chatContainerElement.querySelector('.chat-list-block');
        this.chatRooms = new ReactiveArray([], this.chatListElement, this.updateChatList);
        // let chating = this.chatContainerElement.querySelector('.chating-block');
    }

    updateChatList() {

    }

    setChatRooms(chatRoomsArray) {
        this.chatRooms.array = chatRoomsArray;
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

    bindElement(property, element) {
        if (!this.elements) {
            this.elements = {};
        }
        if (!this.elements[property]) {
            this.elements[property] = [];
        }
        this.elements[property].push(element);
        element.textContent = this.data[property];
        if (element.tagName === "INPUT") {
            element.value = this.data[property];
            element.addEventListener("input", (event) => {
                this.data[property] = event.target.value;
            });
        }
    }

    _updateElements(property, value) {
        if (this.elements[property]) {
            this.elements[property].forEach((element) => {
                if (element.tagName === "INPUT") {
                    element.value = value;
                } else {
                    element.textContent = value;
                }
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
    constructor(array, element, update) {
        this.array = array.map(item => {
            if (typeof item === 'object' && item !== null) {
                return new Binder(item);
            } else {
                return item;
            }
        });
        this.element = element;
        this.update = update;
        this._makeReactive();
    }

    // 將陣列設置為響應式
    _makeReactive() {
        const handler = {
            set: (target, property, value) => {
                target[property] = value;
                this.update(this.element);
                return true;
            },
        };
        this.array = new Proxy(this.array, handler);
    }

    /**
     * 插入元素到最下方  (使用場景: 當有新訊息時加入到留言的最下方)
     * @param {*} item 
     */
    append(item) {
        if (!(item instanceof Binder)) {
            item = new Binder(item);
        }
        this.array.push(item);
    }

    /**
     * 從列表中移除
     * @param {*} id 
     */
    deleteById(id) {
        this.array = this.array.filter(binder => binder.data.id !== id);
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
            if (this.array[i].data.id === targetId) {
                this.array.splice(i, 0, item);
                break;
            }
        }
    }
}