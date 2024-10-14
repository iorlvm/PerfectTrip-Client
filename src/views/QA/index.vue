<script setup>
import { getFaqAPI } from '@/apis/faq';
import { onMounted, ref } from 'vue'

const activeName = ref('first')

const handleClick = (tab, event) => {
    console.log(tab, event)
}

const qaList = ref([]);


const getQAsAPI = async () => {
    return fetch("http://iorlvm.i234.me:8080/api/faq", { method: 'GET' }).then(function (response) { // 接收到回傳的物件
        if (!response.ok) {
            throw new Error();
        }
        return response.json();
    }).then(function (res) {
        if (!res.success) throw new Error();
        return res.data;
    }).catch(function (error) {
        console.log(error);
    })
}

onMounted(async () => {
    const res = await getFaqAPI();
    qaList.value = res.data;
})

</script>

<template>
    <div class="allaroundyou">
        <div class="commonquestion">
            常見問答</div>
        <div class="question1">
            <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                <el-tab-pane label="lodging" name="first">
                    <template #label>
                        <div class="icons">
                            <i class="bi bi-house-door"></i>
                            <span style="font-size: 12px;">住宿</span>
                        </div>
                    </template>
                    <div class="lodging">
                        <div class="lodging2" v-for="(qa, index) in qaList.filter(item => item.qaType === '住宿')"
                            :key="index">
                            <el-collapse>
                                <el-collapse-item :name=index>
                                    <template #title>
                                        <div style="font-size: 1.15em; font-weight: bold;">{{ (index + 1) + '. ' +
                                            qa.qaTitle }}
                                        </div>
                                    </template>
                                    <div class="inner_block" v-html="qa.qaContent"> </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                        <!-- <div class="lodging1">
                            <el-collapse>
                                <el-collapse-item title="1. 取消單" name="1">
                                    <template #title>
                                        <div style="font-size: 1.15em; font-weight: bold;">1. 取消單</div>
                                    </template>
                                    <div class="inner_block">
                                        沒問題！所有取消費用均由住宿方設置，且均註明在您的訂房取消政策內。所有額外產生的取消費用均由住宿方收取。
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                        <div class="lodging2">
                            <el-collapse>
                                <el-collapse-item title="2. 支付情況" name="2">
                                    <template #title>
                                        <div style="font-size: 1.15em; font-weight: bold;">2. 支付情況</div>
                                    </template>
                                    <div class="inner_block">
                                        在刊登於 Booking.com 的住宿中，信用卡是最被廣為接受的付款方式。除此之外，許多住宿會要求使用者提供有效的信用卡，以保留未預先付款的訂單。
                                        <h5>線上付款</h5>
                                        除了信用卡之外，Booking.com 在許多國家也有提供其他多種付款方式（如：PayPal、ApplePay、Klarna）。Booking.com
                                        在特定市場也提供當地付款方式（如：在荷蘭提供
                                        iDeal、在波蘭提供 Blik）。各項數位付款方式能否使用，可能會因國家、地區和／或預訂所用的裝置而有所不同。我們已在此頁面下方列出最常見的付款方式。
                                        <h5>彈性付款方式（現在買，之後付）</h5>
                                        Booking.com 在部分國家會透過 Affirm、AfterPay、Klarna
                                        等第三方提供彈性付款選項，這些方式允許旅客分期付款，或是延後付款日期。短期的分期付款方案（最多 3 至 4
                                        期）通常不收利息，長期的融資可能包含利息。
                                        <h5>可用的付款方式</h5>
                                        各項付款方式能否使用，可能會因國家、幣別、地區和／或預訂所用的裝置而有所不同。
                                    </div>
                                </el-collapse-item>
                            </el-collapse>

                        </div>
                        <div class="lodging3">
                            <el-collapse>
                                <el-collapse-item title="3. 預定資料" name="3">
                                    <template #title>
                                        <div style="font-size: 1.15em; font-weight: bold;">3. 預定資料</div>
                                    </template>
                                    <div class="inner_block">
                                        請參閱預訂確認函，即可查看房間及住宿設施的詳細資訊。
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                        <div class="lodging4">
                            <el-collapse>
                                <el-collapse-item title="4. 住客溝通聯繫" name="4">
                                    <template #title>
                                        <div style="font-size: 1.15em; font-weight: bold;">4. 住客溝通聯繫</div>
                                    </template>
                                    <div class="inner_block">
                                        Booking.com
                                        會為每一筆訂單搭配一組特殊的化名電子信箱，以確保您及住宿單位的隱私權。所有寄到這個化名電子信箱的訊息，皆將轉發至住宿單位，包括連結、圖像、附件檔案（至多 15
                                        MB）。
                                        <br>
                                        <br>
                                        為確保您的個資安全，Booking.com 採用自動化系統偵測通訊內容中的惡意或不雅言語，甚至包括垃圾郵件及特定檔案類型（如 .zip、.rar、.exe
                                        檔）。
                                        <br>
                                        <br>
                                        請注意，根據住宿方要求而發送的自動化郵件將由Booking.com代為發送，Booking.com不為郵件內容負責。若您對郵件內容有疑問，或郵件內含有任何不恰當、可疑內容、垃圾郵件，請您點擊郵件右下角的鏈接進行舉報。
                                        <br>
                                        <br>
                                        Booking.com 將儲存所有通訊內容。Booking.com 可應您或住宿方的要求，以及在安全及執法需求情況下（如詐騙防制與偵測），調閱該通訊內容。
                                        為提升服務品質，Booking.com 可能會針對通訊內容進行分析。如果您不希望 Booking.com 監測或儲存您透過 Booking.com
                                        傳送的通訊內容，請勿使用本站提供之通訊功能以及化名電子信箱。
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                        <div class="lodging5">
                            <el-collapse>
                                <el-collapse-item title="5. 客房類型" name="3">
                                    <template #title>
                                        <div style="font-size: 1.15em; font-weight: bold;">5. 客房類型</div>
                                    </template>
                                    <div class="inner_block">
                                        雙人間配有一張雙人床。雙床間配有兩張單人床。兩者均可容納二人入住。「雙人/雙床間」則可配備雙人床或兩張單人床。預訂時請在「特殊要求」欄內寫明您所需要的床型。
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                        <div class="lodging6">
                            <el-collapse>
                                <el-collapse-item title="6. 價目" name="3">
                                    <template #title>
                                        <div style="font-size: 1.15em; font-weight: bold;">6. 價目</div>
                                    </template>
                                    <div class="inner_block">
                                        每間客房或住宿都有不同的早餐政策。若房價包含早餐，您在比較不同預訂選項時，可在住宿頁面下找到相關資訊。若房價不包含早餐，您可查看住宿方提供的服務／設施中，是否有早餐。訂房後，您也可在帳戶中查看訂單時、或在預訂確認函中找到此資訊。
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                        <div class="lodging7">
                            <el-collapse>
                                <el-collapse-item title=" 7. 信用卡" name="3">
                                    <template #title>
                                        <div style="font-size: 1.15em; font-weight: bold;"> 7. 信用卡</div>
                                    </template>
                                    <div class="inner_block">
                                        一般情況下，飯店不接受客人以銀行借記卡作為預訂保證。不過，也有例外的時候。您在預訂過程中了解到有關詳情。
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                        <div class="lodging8">
                            <el-collapse>
                                <el-collapse-item title="8. 住宿政策規定" name="3">
                                    <template #title>
                                        <div style="font-size: 1.15em; font-weight: bold;">8. 住宿政策規定</div>
                                    </template>
                                    <div class="inner_block">
                                        如我們的人權聲明和反歧視聲明所述，我們致力確保身心障礙旅客在刊登於本站的住宿能受到尊重且沒有歧視的對待。
                                        在許多國家，攜帶輔助型動物的旅客有權預訂任何住宿，且住宿方不得因此收取額外費用或要求附加條件，即使設有禁止攜帶寵物的政策也是如此。
                                        關於輔助型動物的法律規定因地而異，因此建議您在前往任何地點前熟悉並遵守當地法規。
                                        <h3>輔助型動物</h3>
                                        <h5>定義</h5>
                                        經過認證的輔助型動物並非寵物，而是訓練有素的身心障礙支持輔助工具。牠們在協助身心障礙者方面扮演重要的角色，讓這些人士能在安全的情況下，有自信地從事日常工作任務，同時減輕身心障礙帶來的影響。
                                        以下是一些常見的輔助型動物類型：
                                        <h5>導盲動物</h5>可以幫助視障或視力受損的人士。
                                        <h5>聽力輔助</h5>動物會提醒聾啞人士或聽力受損的人士注意特定的聲音。
                                        <h5>服務性動物</h5>會透過執行與身心障礙相關的工作，協助有某些健康狀況或身體、感官或精神障礙的人士。
                                        輔助型動物都是經過訓練，以符合適合公共場所之中動物的衛生和行為標準。
                                        情緒支持、陪伴和安慰性質的動物不屬於輔助型動物。雖然這些動物可以為有生理或心理狀況的旅客提供心理上的支持，但牠們並未經過輔助型動物標準的訓練和認證。
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                        <div class="lodging9">
                            <el-collapse>
                                <el-collapse-item title="  9. 額外設施" name="3">
                                    <template #title>
                                        <div style="font-size: 1.15em; font-weight: bold;"> 9. 額外設施</div>
                                    </template>
                                    <div class="inner_block">
                                        1. 在預訂過程中，您可在「設施」下方查看住宿方是否有停車設施。若住宿方要求顧客預留車位，請直接與對方聯繫，聯絡資訊就在預訂確認函中。
                                        <br>
                                        2. 您可在住宿頁面上的「設施」欄查看住宿方提供的所有設施、活動與服務。
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                        <div class="lodging10">
                            <el-collapse>
                                <el-collapse-item title=" 10. 安全宣導" name="3">
                                    <template #title>
                                        <div style="font-size: 1.15em; font-weight: bold;">10. 安全宣導</div>
                                    </template>
                                    <div class="inner_block">
                                        社交工程是詐騙集團使用的一種手段。他們偽裝為可靠的來源，試圖騙取他人的敏感個人機密資訊。網路詐騙集團通常會裝作知名的公司，利用乍看之下有道理的藉口來向您索取個人資訊或要求您付款。
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>

                        <div class="lodging11">
                            <el-collapse>
                                <el-collapse-item title="11. 新型冠狀病毒疫情相關支援" name="3">
                                    <template #title>
                                        <div style="font-size: 1.15em; font-weight: bold;">11. 新型冠狀病毒疫情相關支援</div>
                                    </template>
                                    <div class="inner_block">
                                        疫情每天都有變化，如要了解訂單的最新資訊或與我們聯繫，請登入您的 Booking.com 帳戶。若沒有帳戶，您可使用訂單確認碼和 PIN
                                        碼從桌電或筆電登入。提醒您，受到目前的情況影響，我們可能需要比平常更久的時間才能回覆您的問題或要求。感謝您耐心等候。
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div> -->
                    </div>
                </el-tab-pane>
                <el-tab-pane label="租車" name="second">
                    <template #label>
                        <div class="icons">
                            <i class="bi bi-car-front-fill"></i>
                            <span style="font-size: 12px;">租車</span>
                        </div>
                    </template>
                    <div class="lodging">
                        <div class="lodging2" v-for="(qa, index) in qaList.filter(item => item.qaType === '租車')"
                            :key="index">
                            <el-collapse>
                                <el-collapse-item :name=index>
                                    <template #title>
                                        <div style="font-size: 1.15em; font-weight: bold;">{{ (index + 1) + '. ' +
                                            qa.qaTitle }}
                                        </div>
                                    </template>
                                    <div class="inner_block" v-html="qa.qaContent"> </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                    </div>

                </el-tab-pane>
                <el-tab-pane label="機票" name="third">
                    <template #label>
                        <div class="icons">
                            <i class="bi bi-airplane"></i>
                            <span style="font-size: 12px;"> 機票</span>
                        </div>
                    </template>
                    <div class="lodging">
                        <div class="lodging2" v-for="(qa, index) in qaList.filter(item => item.qaType === '機票')"
                            :key="index">
                            <el-collapse>
                                <el-collapse-item :name=index>
                                    <template #title>
                                        <div style="font-size: 1.15em; font-weight: bold;">{{ (index + 1) + '. ' +
                                            qa.qaTitle }}
                                        </div>
                                    </template>
                                    <div class="inner_block" v-html="qa.qaContent"> </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                    </div>
                </el-tab-pane>

                <el-tab-pane label="機場計程車" name="fourth">
                    <template #label>
                        <div class="icons">
                            <i class="bi bi-taxi-front"></i>
                            <span style="font-size: 12px;">機場計程車</span>
                        </div>
                    </template>
                    <div class="lodging">
                        <div class="lodging2" v-for="(qa, index) in qaList.filter(item => item.qaType === '機場計程車')"
                            :key="index">
                            <el-collapse>
                                <el-collapse-item :name=index>
                                    <template #title>
                                        <div style="font-size: 1.15em; font-weight: bold;">{{ (index + 1) + '. ' +
                                            qa.qaTitle }}
                                        </div>
                                    </template>
                                    <div class="inner_block" v-html="qa.qaContent"> </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                    </div>
                </el-tab-pane>

                <el-tab-pane label="保險" name="4">
                    <template #label>
                        <div class="icons">
                            <i class="bi bi-shield-check"></i>
                            <span style="font-size: 12px;">保險</span>
                        </div>
                    </template>
                    <div class="lodging">
                        <div class="lodging2" v-for="(qa, index) in qaList.filter(item => item.qaType === '保險')"
                            :key="index">
                            <el-collapse>
                                <el-collapse-item :name=index>
                                    <template #title>
                                        <div style="font-size: 1.15em; font-weight: bold;">{{ (index + 1) + '. ' +
                                            qa.qaTitle }}
                                        </div>
                                    </template>
                                    <div class="inner_block" v-html="qa.qaContent"> </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                    </div>
                    <div class="insurance">


                    </div>
                </el-tab-pane>
                <el-tab-pane label="其他" name="5">
                    <template #label>
                        <div class="icons">
                            <i class="bi bi-three-dots"></i>
                            <span style="font-size: 12px;">其他</span>
                        </div>
                    </template>
                    <div class="lodging">
                        <div class="lodging2" v-for="(qa, index) in qaList.filter(item => item.qaType === '其他')"
                            :key="index">
                            <el-collapse>
                                <el-collapse-item :name=index>
                                    <template #title>
                                        <div style="font-size: 1.15em; font-weight: bold;">{{ (index + 1) + '. ' +
                                            qa.qaTitle }}
                                        </div>
                                    </template>
                                    <div class="inner_block" v-html="qa.qaContent"> </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>


<style>
.allaroundyou .el-tabs__nav {
    padding: 20px;
    /* height: 80px; */
}

.allaroundyou .el-collapse {
    --el-collapse-border-color: transparent !important;
}
</style>

<style lang="scss" scoped>
.allaroundyou {
    padding: 20px 70px;

    .commonquestion {
        font-size: 24px;
        padding: 10px;

    }

    .icons {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 10px;
        padding: 0 15px;
    }

    .icons i {
        font-size: 24px;
    }

    .lodging {
        border: 1px solid #0000002a;
        border-radius: 8px;

        .lodging2 {
            border: 1px solid #0000002a;
            border-right-color: transparent;
            border-left-color: transparent;
            padding: 10px 20px;

            .switch_btn {
                float: right;
                background: none;
                border: 0;
                font-size: 24px;

                .-minus {
                    display: none;
                }
            }
        }
    }

    .demo-tabs>.el-tabs__content {
        padding: 80px;
        color: #6b778c;
        font-size: 70px;
        font-weight: 600;
    }
}
</style>