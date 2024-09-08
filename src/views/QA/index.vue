<script setup>
import { onMounted, ref } from 'vue'

const activeName = ref('first')

const handleClick = (tab, event) => {
    console.log(tab, event)
}

const qaList = ref([]);


const getQAsAPI = async () => {
    return fetch("http://localhost:8080/api/faq", { method: 'GET' }).then(function (response) { // 接收到回傳的物件
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
    qaList.value = await getQAsAPI();

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
                        <div class="loading-with-icon">
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
                        <div class="car-rent-icon">
                            <i class="bi bi-car-front-fill"></i>
                            <span style="font-size: 12px;">租車</span>
                        </div>
                    </template>
                    <div class="car-rent">
                        <div class="car-rent1">
                            <el-collapse>
                                <el-collapse-item title=" 1. 最常見" name="1">
                                    <template #title>
                                        <div style="font-size: 1.15em; font-weight: bold;">1. 最常見</div>
                                    </template>
                                    <div class="inner_block">
                                        主要駕駛人必須出示有自己姓名的信用卡以支付安全押金。只有非常少數的租車公司可接受以簽帳卡支付押金，請查看租車條款。
                                        他們也會向您收取：
                                        <br>1. 任何額外項目（GPS、兒童安全座椅等）
                                        <br>2. 任何費用（青年駕駛費、甲租乙還費等）
                                        <br>3. 任何您向他們購買的額外保障。
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                        <div class="car-rent2">
                            <el-collapse>
                                <el-collapse-item title=" 2. 駕駛人的責任與條件" name="2">
                                    <template #title>
                                        <div style="font-size: 1.15em; font-weight: bold;">2. 駕駛人的責任與條件</div>
                                    </template>
                                    <div class="inner_block">
                                        主要駕駛人需要攜帶：
                                        <br>1. 主要駕駛人名字的信用卡，且需有足夠的餘額可以負擔租車押金（部分租車公司也接受簽帳卡）
                                        <br>2. 完整的駕照，主要駕駛人必須持有駕照至少 2 年（部分租車公司要求更久）
                                        <br>3. 取車單
                                        在部分情況下，也會需要其他文件檔案。
                                        若有其他人也會駕車，則也需要他們的駕照。
                                        非常重要：若您沒有所有必備資料，櫃台人員將無法提供租車給您－請務必查看「取車必備資料」下的租車條款。
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                        <div class="car-rent3">
                            <el-collapse>
                                <el-collapse-item title=" 3. 燃油、里程數與旅程規劃" name="2">
                                    <template #title>
                                        <div style="font-size: 1.15em; font-weight: bold;">3. 燃油、里程數與旅程規劃</div>
                                    </template>
                                    <div class="inner_block">
                                        <h4>我的租車有無上限哩程數嗎？</h4>
                                        這將依情況而定，請查看租車條款的「包括在租金價格内」。
                                        <h4>我要怎麼知道車子加什麼油？</h4>
                                        租車公司經常會更換車輛，因此我們無法提前確認您的租車是使用哪種燃油。
                                        如果在取車時，櫃台人員沒有告訴您，請直接詢問。
                                        油箱蓋內可能會有標示。

                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>

                        <div class="car-rent4">
                            <el-collapse>
                                <el-collapse-item title=" 4. 保險與保障" name="42">
                                    <template #title>
                                        <div style="font-size: 1.15em; font-weight: bold;">4. 保險與保障</div>
                                    </template>
                                    <div class="inner_block">
                                        <h4>「自負額」是什麼？我的自負額是多少？</h4>
                                        自負額是指發生狀況時，您需負擔的金額，因此...
                                        如果車體受損，您會需要支付車損自負額，而「碰撞損害免責」* 則會支付剩下的餘額。
                                        若車子遭竊，您需負擔失竊自負額，而「竊盜險」* 會支付剩下的餘額。
                                        如要查看車損和失竊自負額的詳情，您可以在取車單上，或是租車條款的「押金，自負額和保險」找到該資訊。
                                        * 此保險僅在您遵守租車合約條款的情況下才有效。
                                        <h4>我的租車有什麼保險／保障？</h4>
                                        所有租車都必須有碰撞損害免責和竊盜險。依據您預約租車的地點，可能會有不同的情況：
                                        <br>1. 在預約時，已包含在租車內；或
                                        <br>2. 由主要駕駛人的信用卡公司提供；或
                                        <br>3. 在您到租車櫃台時，向租車公司購買。
                                        您可以在取車單上，以及租車條款的「押金，自負額和保險」找到詳細資訊。
                                        您在預約租車或是在租車櫃台時，也可以購買額外保險。
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>

                        <div class="car-rent5">
                            <el-collapse>
                                <el-collapse-item title=" 5. 額外項目" name="5">
                                    <template #title>
                                        <div style="font-size: 1.15em; font-weight: bold;">5. 額外項目</div>
                                    </template>
                                    <div class="inner_block">
                                        <h4>「額外指定駕駛」是什麼意思？我需要付錢增加指定駕駛名額嗎？</h4>
                                        非常重要：僅有姓名列在租車合約上的駕駛人才得開車。
                                        「主要駕駛人」就包含在內，也就是您在預約租車時提供的駕駛人資料。
                                        若您希望其他人同被列為駕駛，您可以在取車時將他們的資料提供給櫃台人員。這通常會需要一筆費用，部分租車公司可能會讓您免費新增一位或多位額外指定駕駛。
                                    </div>

                                    <h4>我可以向租車櫃台購買哪些額外保障？</h4>
                                    不同的租車公司會銷售不同的額外保障，不過最常見的有超級碰撞損害免責（SCDW）。依據租車公司而定，超級碰撞損害免責的政策可能是：
                                    <br>1. 未包含在標準碰撞損壞免責（CDW）的汽車零件保障（如：車窗、輪胎）
                                    <br>2. 減少自負額（若車子在保障範圍內有任何損壞，您仍需支付的金額）。
                                    <br>3. 自負額減至零自負額，讓您在取車時無需支付押金，或車子在保障範圍內有任何損壞時無需支付任何費用。
                                    在您購買任何保障之前，建議您可以先了解自負額是多少，以及政策包含／未包含的項目。
                                </el-collapse-item>
                            </el-collapse>
                        </div>

                        <div class="car-rent6">
                            <el-collapse>
                                <el-collapse-item title=" 6. 付款、費用與確認資訊" name="6">
                                    <template #title>
                                        <div style="font-size: 1.15em; font-weight: bold;">6. 付款、費用與確認資訊</div>
                                    </template>
                                    <div class="inner_block">
                                        <h4>我必須支付多少押金？</h4>
                                        您的取車單會說明押金是多少，租車條款的「押金，自負額和保險」也會載明。
                                        <h4>為什麼在租車地點需要支付押金？</h4>
                                        此為安全押金，您在租車結束後可領回。
                                        如果車子在租車期間有撞到或刮傷，租車公司可能會保留部分或全額押金以支付修理費用。
                                        如果車子非常髒、延遲還車，或在錯誤的租車地點還車，他們也可能會保留部分押金。
                                        <h4>我要如何支付租車費用？</h4>
                                        當預約租車時，可使用大部分的信用卡或簽帳卡付款（我們會說明可使用的卡片）。
                                        在租車地點時，僅有非常少數的租車公司接受以簽帳卡支付安全押金。在大多數的情況下，主要駕駛人在取車時必須出示自己姓名的信用卡，不必和預約租車時使用同一張卡片。
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>

                        <div class="car-rent7">
                            <el-collapse>
                                <el-collapse-item title=" 7. 更改訂單內容" name="˙7">
                                    <template #title>
                                        <div style="font-size: 1.15em; font-weight: bold;">7. 更改訂單內容</div>
                                    </template>
                                    <div class="inner_block">
                                        <h4>如果我需要取消訂單怎麼辦？</h4>
                                        如果距離租車起始時間超過 48 小時，取消可獲全額退款*。
                                        若您在租車起始時間的不到 48 小時前取消，或者在取車時間於租車櫃台取消，我們會從您已付的金額中扣除 3
                                        天的租車費用，再將餘額退還*給您。因此，若您預約的租期為 3
                                        天以內，將不會收到任何退款。
                                        如您在原定租車起始時間過後取消，或者未如期取車，您將無法獲得退款。
                                        *除非您預約的租車有「不可退款」的標示。
                                        <h4>我要如何取消訂單？</h4>
                                        最簡單的方式就是線上取消－只要登入並前往您的訂單，然後取消訂單即可。
                                        如要前往您的訂單頁面...
                                        如果您使用 APP，請點螢幕下方的「訂單」。
                                        如果您使用網站，請記得登入並前往「租車」的頁面，然後點選上方的「管理訂單」。
                                        可能會有取消費...
                                        如果距離租車起始時間超過 48 小時，取消可獲全額退款*。
                                        若您在租車起始時間的不到 48 小時前取消，或者在取車時間於租車櫃台取消，我們會從您已付的金額中扣除 3
                                        天的租車費用，再將餘額退還*給您。因此，若您預約的租期為 3
                                        天以內，將不會收到任何退款。
                                        如您在原定租車起始時間過後取消，或者未如期取車，您將無法獲得退款。
                                        *除非您預約的租車有「不可退款」的標示。
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>

                        <div class="car-rent8">
                            <el-collapse>
                                <el-collapse-item title="8. 取車與還車" name="8">
                                    <template #title>
                                        <div style="font-size: 1.15em; font-weight: bold;">8. 取車與還車</div>
                                    </template>
                                    <div class="inner_block">
                                        <h4>我要如何找到租車地點？</h4>
                                        在大部分的情況下，您的取車單會列出租車公司的地址，並告訴您如何前往租車地點。
                                        到機場時，請留意汽車上面有鑰匙的標誌，並可能會有「Rent a car」或「Car rental」的說明。
                                        <h4>在租車結束時，我要如何還車？</h4>
                                        您可以在取車時詢問櫃台人員。
                                        若還車時沒有服務人員（如：在半夜還車），他們可能會設置可放鑰匙「歸還箱」，同樣地，您也可在取車時向櫃台人員確認此事。
                                        最好能保留所有您拿到的書面文件。
                                        <h4>如果我的班機誤點或取消怎麼辦？ </h4>
                                        若您在訂單內有新增航班代號，租車公司或許能追蹤您的航班，並在航班延誤或取消時，可能在「寬限期」保留您的租車，但並不保證如此。
                                        若您的訂單有寬限期，您可以前往租車條款中「重要須知」的「寬限期」找到更多資訊。
                                        若您的班機延誤或取消，請盡快撥打取車單上的電話，告知租車公司。
                                        班機延誤或取消是我們無法控制的情況，因此我們恕不為任何衍生的問題或費用負責。
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>

                        <div class="car-rent9">
                            <el-collapse>
                                <el-collapse-item title="9. 租車結束後的事宜" name="9">
                                    <template #title>
                                        <div style="font-size: 1.15em; font-weight: bold;">9. 租車結束後的事宜</div>
                                    </template>
                                    <div class="inner_block">
                                        <h4>如果我提早還車，可以獲得退款嗎？</h4>
                                        不行。當您預約租車時，租車公司就為您保留了整個租用期間的車子，這代表他們不會讓其他人在該期間預約您的租車。因此，我們無法針對「未使用」的時間退款。
                                        此為租車產業常見的標準做法。
                                        <h4>如果我在租車結束之後有問題怎麼辦？</h4>
                                        這將依照您的問題類型而定。
                                        如果您遺失東西在車上，或者需要租車公司提供任何文件或資料，請與租車公司聯絡。您可以在取車單或是線上查看您的訂單，找到他們的聯絡資料。
                                        如有其他問題，請與我們聯絡，我們很樂意協助您。
                                        <h4>為什麼租車公司向我收費？</h4>
                                        這將依情況而定，並且依各家公司而有不同情況，但通常是...
                                        當您取車時，他們會向您收取：
                                        <br>1. 任何額外項目（GPS、兒童安全座椅等）
                                        <br>2. 任何費用（青年駕駛費、甲租乙還費等）
                                        <br>3. 任何您向他們購買的額外保障。
                                        這些費用應會列在您的收據明細上。
                                        <br>當您還車時，他們會向您收取：
                                        <br>1. 所有車子損壞或任何您使用的額外服務之費用
                                        <br>2. 任何不足的燃油費（如：應滿油還車，但油箱未加滿）
                                        <br>3. 如果車子非常髒，無法只進行「一般」流程清潔
                                        <br>4. 若您延遲還車，會在錯誤的地點還車。
                                        這些費用應會列在您的收據明細上。
                                        還車之後，他們也有可能會向您的卡片收取一些在您還車時仍未預期的費用，像是：違反交通規則的罰款。
                                        若您對租車公司的任何費用有任何疑問，請與他們聯繫。您可以在取車單或是線上查看您的訂單，找到他們的聯絡資料。
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>

                        <div class="car-rent10">
                            <el-collapse>
                                <el-collapse-item title=" 10. 電動車" name="10">
                                    <template #title>
                                        <div style="font-size: 1.15em; font-weight: bold;">10. 電動車</div>
                                    </template>
                                    <div class="inner_block">
                                        <h4>電動車充電需要多久？</h4>
                                        電動車的充電時間最快 30 分鐘，最久可達 12 小時，視您選擇的車款及充電站的速度而定。典型的電動車（搭配 60kWh 電池）在 7kW 的充電站只要 8
                                        小時內就能充飽電。
                                        許多公共充電站設有快速充電器，可以在 30% 將電量充到 50%。
                                        <h4>電動車充電需要多少費用？</h4>
                                        您可以在公共充電站充電。公共充電站有的免費，有的採隨充隨付，也有的採訂閱制，而價格由能源公司或充電站業主所訂。有些電動車製造商（如現代、日產或特斯拉）可能會在較大型的高速公路途中設置免費充電站，提供給自家產的車子使用。
                                        您也可以在家使用專門的家用充電器（隨車附上）替電動車充電，該充電器適用於一般的插座。
                                        <h4>如果電動車在路上臨時沒電，該怎麼辦？</h4>
                                        若您在抵達下一個充電站前就將電力耗盡，電動車會停止。您需要打給道路救援，請人將車子拖到最近的充電站。在這種狀況發生之前，車子會發出多則警告，故您應有充分時間找到充電站。
                                        <h4>如何尋找離我最近的充電站？</h4>
                                        各城市通常會在網路上提供電動車充電站地圖，顯示可充電的地方。現在也有多種專用的
                                        APP，上路時，您可下載其中一種以查看可用的充電站，以及您離最近的快速充電站的距離。其他如 Google
                                        地圖、Waze 等導航的 APP 也有相關功能，可標出您行程途中的充電站。推薦參考如 PlugShare
                                        的充電站地圖，事先規劃您要充電的站點，為您的旅程做好準備。
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>

                    </div>

                </el-tab-pane>
                <el-tab-pane label="機票" name="third">
                    <template #label>
                        <div class="air-ticket-icon">
                            <i class="bi bi-airplane"></i>
                            <span style="font-size: 12px;"> 機票</span>
                        </div>
                    </template>
                    <div class="air-ticket">
                        <div class="air-ticket1">
                            <el-collapse>
                                <el-collapse-item title=" 1. 行李與座位" name="1">
                                    <template #title>
                                        <div style="font-size: 1.15em; font-weight: bold;">1. 行李與座位</div>
                                    </template>
                                    <div class="inner_block">
                                        <h4>我可以攜帶多少行李？</h4>
                                        您可以在預訂流程中看到行李額度。您或許也能選擇另外付費來增加行李額度，實際情況視航班而定。
                                        預訂後，您可以到訂單詳情頁面查看行李額度。您也可以到航空公司網站查看確切的行李重量與體積限制。
                                        <h4>隨身行李與託運行李的體積上限為何？</h4>
                                        每個航班與每間航空公司的規定有所不同，建議您查看航空公司官網，了解確切的重量與尺寸限制為何。

                                        <h4>我可以增加航班的行李額度嗎？</h4>
                                        部分航班能讓您在預訂過程或預訂後增加更多行李。
                                        預訂後，您可以在訂單詳情頁面加購行李額度。如找不到相關選項，請聯繫本站，我們將能協助您為訂單新增行李額度。
                                        <h4>隨身行李可以帶哪些物品？</h4>
                                        每間航空公司的規定有所不同，但有關攜帶任何液體或尖銳物體的規定通常相當嚴格。
                                        您可以查看航空公司網站，了解哪些物品可放入隨身行李、哪些個人用品可帶上機。
                                        <h4>我可以攜帶寵物嗎？</h4>
                                        部分航空公司開放乘客攜帶寵物。如欲要求攜帶寵物，請務必與我們聯繫，我們會替您向航空公司確認。若要將攜帶寵物加進您的訂單內容中，您需支付相關手續費。
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>

                        <div class="air-ticket2">
                            <el-collapse>
                                <el-collapse-item title=" 2. 登機證及辦理報到" name="1">
                                    <template #title>
                                        <div style="font-size: 1.15em; font-weight: bold;">2. 登機證及辦理報到</div>
                                    </template>
                                    <div class="inner_block">
                                        <h4>哪裡可以找到我的機票訂單？</h4>
                                        如果您有 Booking.com 帳戶並使用和帳戶相同的 Email 預訂機票，登入帳戶即可查看您的訂單。
                                        如果您使用不同的 Email 預訂機票，請用此 Email 建立帳戶以查看訂單。
                                        如果您有更改訂單，訂單內容不見得會更新反映這些變更，但確認變更後您應該會收到一封新的 Email 確認函。
                                        <h4>我要在何時提供護照／身分證明資訊？</h4>
                                        因航空公司和前往的目的地而異。多數情況下需要在預訂途中或辦理航班登機時提供。有些航空公司也可能會寄 Email 向您索取護照／身分證明資訊。
                                        請務必確保您輸入的資訊正確無誤，以免需支付額外費用更正。
                                        <h4>如何辦理登機？</h4>
                                        您可按下列步驟在航空公司網站辦理登機：
                                        <br>
                                        <br>1.多數航空公司會在起飛的 24 小時前開放辦理登機。請至航空公司網站查詢確認。
                                        <br>2.欲辦理登機，請進入航空公司網站，輸入您的航空公司／訂單編號，完成所有步驟。某些情況下，您可能會需要用到一組特定的電子郵件地址，這組地址需和預訂時用的
                                        Email
                                        不同。您可到我們寄發的
                                        Email 中查看線上辦理登機的一切所需資訊。
                                        <br>3.收到航空公司給予的登機證
                                        某些情況下，您也可在機場的航空公司登機櫃台辦理，或使用自助機台辦理。不過某些航空公司可能會向在機場辦理登機的旅客收取額外費用。可至航空公司網站查詢辦理登機的確切時機和不同辦理方法。
                                        <h4>哪裡可以找到我的登機證？</h4>
                                        成功辦理登機後，航空公司會給予登機證。如果是線上辦理，航空公司通常可讓您選擇用偏好的方式領取登機證，但多數時候會用 Email 寄給您。

                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>

                        <div class="air-ticket3">
                            <el-collapse>
                                <el-collapse-item title=" 3. 預定航班" name="1">
                                    <template #title>
                                        <div style="font-size: 1.15em; font-weight: bold;">3. 預定航班</div>
                                    </template>
                                    <div class="inner_block">
                                        <h4>什麼是自行轉機航班？</h4>
                                        若飛往目的地的航程包含多段航班，而途中您需要轉機，通常航空公司會處理轉機事宜。但如果您選擇自行轉機航班，轉機事宜就必須由您自行處理，因為機票是分開購買的。組合航班可為您提供最優惠的選項，也有更多路線和飛行時段可選擇，然而，分開購買機票表示您必須自行處理轉機事宜，可能的事項包括提領行李、接受簽證與安全檢查等。幸好，我們提供「自行轉機保障」，萬一銜接過程出了差錯，導致您錯過班機，我們會協助您尋找替代航班，而且不會收取額外費用，讓您自行轉機時多一分保障。
                                        <h4>我可以為獨自旅行的孩童訂票嗎？</h4>
                                        不行，您無法在本站替無人陪同旅行的孩童訂票。部分航空公司可能會允許，因此請查看航空公司的政策並直接向他們預訂。
                                        <h4>什麼是彈性機票？</h4>
                                        預訂機票時，部分航空公司會提供彈性機票的選項。以下是關於彈性機票的資訊：
                                        <br>若行程有變，最晚可於出發的 24 小時前更換航班
                                        <br>無需額外費用－只需支付機票價差（若有）
                                        <br>僅適用於相同航空公司、出發地與目的地
                                        <h4>在填寫乘客資料中的姓名時，需要注意什麼？</h4>
                                        請輸入與您護照／旅行文件上完全一致的姓名，寫法也一致。航空公司對此通常非常嚴格，若護照／旅行文件上的姓名與機票不一致，您將有可能無法登機。
                                        <h4>我可以輸入航空公司常客計畫的編號嗎？</h4>
                                        很遺憾，目前於本站預訂時仍無法輸入航空公司常客計畫的資料。
                                        不過，您可以在預訂後透過航空公司網站輸入常客計畫的資料，只要在航空公司網站輸入您的訂單編號／航班訂單編號，就能查看您的訂單。若您需要更多協助，也可以與我們聯繫。
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>

                        <div class="air-ticket4">
                            <el-collapse>
                                <el-collapse-item title=" 4. 變更及取消" name="1">
                                    <template #title>
                                        <div style="font-size: 1.15em; font-weight: bold;">4. 變更及取消</div>
                                    </template>
                                    <div class="inner_block">
                                        <h4>我可以更改機票上的姓名嗎？</h4>
                                        航空公司通常不開放旅客更改或修正姓名。如可更改，將需額外付費。請與我們聯繫，我們會協助您查詢此事。
                                        <h4>為什麼我看不到我在機票訂單中做的變更？</h4>
                                        若您對訂單進行任何變更，這些變更可能不會反映在您 Booking.com 帳戶的訂單內容中。不過，在變更內容確認完成後，您應會收到一封新的預訂確認函。
                                        <h4>退款程序如何運作？</h4>
                                        若您符合退款資格，我們可以代您向航空公司提出退款申請。在航空公司同意該申請，且將款項退給我們之後，我們便會根據航空公司政策來處理您的退款，並將透過您的原付款方式將退款金額發放給您。
                                        <h4>處理退款需要多少時間？</h4>
                                        很抱歉，我們無法具體說明您何時會收到退款，因為這取決於航空公司的處理時間。不過，我們仍會盡量讓您早點收到退款。我們將退款匯到您帳戶後便會透過 Email
                                        通知您。
                                        接著可能會另外需要 2 到 5 個工作天，您才會在帳戶中看到款項，實際時間視您的款項處理供應商而定。部分供應商與幣別所需的處理時間可能需要 7 天或更久。
                                        <h4>我可以在訂單新增嬰兒乘客嗎？</h4>
                                        若您已預訂機票，但您未說明有嬰兒同行，請致電本站，我們可以協助您新增相關資訊。
                                        如同成年乘客，嬰兒乘客也需要有效的機票才可搭乘。提醒您，航空公司可能需對此收取額外費用，我們可在您聯繫本站時說明更多相關資訊。
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>

                        <div class="air-ticket5">
                            <el-collapse>
                                <el-collapse-item title=" 5. 機票確認函" name="1">
                                    <template #title>
                                        <div style="font-size: 1.15em; font-weight: bold;">5. 機票確認函</div>
                                    </template>
                                    <div class="inner_block">
                                        <h4>找不到確認函怎麼辦？</h4>
                                        您的確認函會發送到預訂時提供的電子信箱。請記得前往查看您的電子信箱收件匣、廣告信和垃圾信件匣。
                                        您也可以在訂單詳細資訊的頁面重新發送確認函給自己。
                                        若您仍無法找到確認函或是預訂失敗，請與我們聯絡，我們會協助您。
                                        <h4>哪裡可以找到我的機票？</h4>
                                        我們目前沒有發送機票訂單的票券或電子機票，不過您會收到兩封郵件，其功能與電子機票相同：
                                        <br>確認函：這是您的訂單已確認的證明。
                                        <br>訂單資訊信件：這包含了所有訂單資訊，像是航空公司／航班訂單編號、辦理登機的信件，以及電子機票號碼（如適用）。此封信件裡面的資訊包含所有辦理登機需要的資訊。
                                        <br>這些信件是分開發送，而訂單詳情的信件可能需要幾天的時間才會發送至您的收件匣。若您在電子信箱的收件匣找不到信件，請檢查您的垃圾信件匣。您也可以與我們聯絡尋求進一步協助。

                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>

                        <div class="air-ticket6">
                            <el-collapse>
                                <el-collapse-item title=" 6. 我的航班訂單" name="1">
                                    <template #title>
                                        <div style="font-size: 1.15em; font-weight: bold;">6. 我的航班訂單</div>
                                    </template>
                                    <div class="inner_block">
                                        <h4>找不到確認函怎麼辦？</h4>
                                        您的確認函會發送到預訂時提供的電子信箱。請記得前往查看您的電子信箱收件匣、廣告信和垃圾信件匣。
                                        您也可以在訂單詳細資訊的頁面重新發送確認函給自己。
                                        若您仍無法找到確認函或是預訂失敗，請與我們聯絡，我們會協助您。
                                        <h4>哪裡可以找到我的機票？</h4>
                                        我們目前沒有發送機票訂單的票券或電子機票，不過您會收到兩封郵件，其功能與電子機票相同：
                                        <br>
                                        <br>1.確認函：這是您的訂單已確認的證明。
                                        <br>2.訂單資訊信件：這包含了所有訂單資訊，像是航空公司／航班訂單編號、辦理登機的信件，以及電子機票號碼（如適用）。此封信件裡面的資訊包含所有辦理登機需要的資訊。
                                        這些信件是分開發送，而訂單詳情的信件可能需要幾天的時間才會發送至您的收件匣。若您在電子信箱的收件匣找不到信件，請檢查您的垃圾信件匣。您也可以與我們聯絡尋求進一步協助。

                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>

                        <div class="air-ticket7">
                            <el-collapse>
                                <el-collapse-item title=" 7. 款項" name="1">
                                    <template #title>
                                        <div style="font-size: 1.15em; font-weight: bold;">7. 款項</div>
                                    </template>
                                    <div class="inner_block">
                                        <h4>我能索取發票嗎？</h4>
                                        您可以從機票訂單詳情頁面下載付款證明。您可在訂單確認後或是在您的訂單中找到該頁面。
                                        請留意，我們目前無法提供您具法律效力的發票。
                                        <h4>我可以分期付款嗎？ </h4>
                                        若您是在巴西預訂機票，最多可選擇分 12 期付款，並可在預訂的最終步驟選擇想分幾期付款。您需使用 Elo、Visa、Hipercard 或 Mastercard
                                        信用卡付款。
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>

                        <div class="air-ticket8">
                            <el-collapse>
                                <el-collapse-item title=" 8. 旅客資料" name="1">
                                    <template #title>
                                        <div style="font-size: 1.15em; font-weight: bold;">8. 旅客資料</div>
                                    </template>
                                    <div class="inner_block">
                                        <h4>如何為嬰兒訂票？</h4>
                                        如果要幫嬰兒訂票，請在搜尋機票時新增孩童旅客。請注意，若嬰兒人數比成人人數多，則無法預訂。因為基於安全緣故，每位嬰孩都必須有成人陪同。
                                        在飛行期間，嬰兒應坐在成人的腿上，因此無法為嬰兒預訂座位。由於帶嬰兒搭機乘坐位置會有相關規範限制，因此通常會由航空公司安排座位。
                                        <h4>我把旅客姓名打錯了，可以修正嗎？</h4>
                                        大部分的航空公司不允許修改或更正旅客姓名。但您可以與我們聯繫，我們會協助您了解情況。
                                        若航空公司允許變更，他們可能會收取行政手續費。在完成變更之前，我們會通知您。
                                        <h4>請問如何提出特殊協助的要求？</h4>
                                        當您的訂單確認後，請與我們聯繫，我們會協助安排。
                                        如需輪椅協助，並會使用自己的輪椅旅行，請告知我們長度、寬度、高度、電池動力要求（如適用），以及是否可以摺疊。這些資訊可以幫助航空公司做出所需的安排。

                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>

                        <div class="air-ticket9">
                            <el-collapse>
                                <el-collapse-item title=" 9. 新型冠狀病毒疫情相關支援" name="1">
                                    <template #title>
                                        <div style="font-size: 1.15em; font-weight: bold;">9. 新型冠狀病毒疫情相關支援</div>
                                    </template>
                                    <div class="inner_block">
                                        <h4>我可以獲得退款嗎？</h4>
                                        須視航空公司的政策而定。請前往您的航空公司網站查看目前實施的退款政策為何。部分航空公司會提供兌換券或讓旅客選擇重新預訂。儘管我們需遵循不同航空公司的規定，我們仍將會盡力為您提供協助
                                        <h4>處理退款需要多少時間？</h4>
                                        提醒您，受到目前情況影響，退款處理時間會比以往來得長。由於每間航空公司的業務量也極為龐大，我們無法告訴您處理退款所需的確切時間，但我們一定會竭盡所能盡快讓您收到退款。待您的退款處理完畢後，您將會收到
                                        Email 通知，因此還請您耐心等候。
                                        <h4>我會如何收到關於退款的最新消息？</h4>
                                        在您的變更或退款處理完成後，您將會收到一封 Email。請您不要聯繫我們詢問最新情況，並請您耐心等候 Email 通知，信中將含有更多資訊。
                                        <h4>我可以在哪裡取消或更改機票？</h4>
                                        首先，請先向航空公司確認您的航班適用於不可抗力規定。提醒您，並非所有航空公司都實施相同的退款及重新預訂政策，而不論在哪一種情況下，本站都會遵循每間航空公司的規定。
                                        <h4>可以幫我向我預訂機票的航空公司申請退款嗎？</h4>
                                        由於新冠肺炎疫情爆發，航空業正面臨著特殊情況，需處理大量的機票取消單與退款要求。若您想要更改或取消機票訂單，我們將能代您聯繫航空公司來更改機票內容，如航空公司願意提供退款或兌換券，我們收到後也會轉交給您，實際情況需視目前適用的航空公司政策而定。由於航空公司持續在評估並修改退款政策，因此我們無法保證您能獲得退款。我們為您處理此特殊情形的費用為每筆訂單
                                        30
                                        歐元，可預先付款。提醒您，我們會以收到要求的順序來處理所有退款或更改機票事宜。受到目前情況及漸增的業務量影響，預估處理時間會比以往來得長。我們會竭盡所能盡快為您提供協助，但如有任何耽誤情形，恕我們無法負責。
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>

                    </div>
                </el-tab-pane>
                <el-tab-pane label="機場計程車" name="fourth">
                    <template #label>
                        <div class="airport-taxi-icon">
                            <i class="bi bi-taxi-front"></i>
                            <span style="font-size: 12px;">機場計程車</span>
                        </div>
                    </template>
                    <div class="ariport-taxi">
                        <div class="ariport-taxi1">
                            <el-collapse>
                                <el-collapse-item title=" 1. 管理訂單" name="1">
                                    <template #title>
                                        <div style="font-size: 1.15em; font-weight: bold;">1. 管理訂單</div>
                                    </template>
                                    <div class="inner_block">
                                        <h4>我可以取消訂單嗎？</h4>
                                        您最晚可以在乘車的 24 小時前到「管理我的訂單」取消乘車。
                                        只要提前足夠的時間通知司機，大多數乘車訂單都可以輕鬆取消。如欲了解需要提前多少時間通知，請查看您的預訂確認函。
                                        <h4>我可以更改訂單內容嗎？</h4>
                                        可以。在線上修改訂單非常簡單，您可以更改上車時間、航班號碼、上車與下車地點及乘客資訊。前往「管理我的訂單」即可修改。
                                        <h4>我可以更改人數嗎？</h4>
                                        若您預計將在 24 小時內乘車，請打電話給我們。我們或許可以為您修改人數，但因為通知時間較晚，我們無法向您保證。
                                        若您的乘車時間距離現在超過 24 小時，請取消訂單並重新預約符合您團體人數的車輛類型。
                                        <h4>如何更新我的聯絡資訊？</h4>
                                        我們建議您前往「管理我的訂單」更新訂單資訊。您可以在此修改上車時間、航班號碼、上車與下車地點及乘客資訊。
                                        <h4>找不到訂單資訊該怎麼辦？</h4>
                                        您應該會在預約後馬上收到預訂確認函－若您沒有在收件匣看到信，請檢查您的促銷／垃圾信件匣。如果您沒有收到預訂確認函，請透過本站的線上聯繫表單與我們聯絡，以便我們為您提供協助。
                                        <h4>無法查看訂單內容該怎麼辦？</h4>
                                        請檢查您是否已輸入正確的電子信箱及訂單編號。您可以在預訂後所收到的電子郵件中找到訂單編號。若您仍無法查看訂單內容，請透過本站的線上聯繫表單與我們聯絡。
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>

                        <div class="ariport-taxi2">
                            <el-collapse>
                                <el-collapse-item title=" 2. 行程" name="1">
                                    <template #title>
                                        <div style="font-size: 1.15em; font-weight: bold;">2. 行程</div>
                                    </template>
                                    <div class="inner_block">
                                        <h4>如果我的航班被取消或變更降落機場，我該怎麼辦？</h4>
                                        若您的航班取消，此情況將適用我們一般的取消政策。您可以在本站的條款與條件找到相關資訊。
                                        通常可以向您的航空公司或旅遊保險單位索賠您的接駁交通費用。如果您需要任何訂單相關資訊來協助您提出索賠，請與我們聯繫。
                                        <h4>如果我的航班提早抵達或延遲了，該怎麼辦？</h4>
                                        若您預約了迎賓接機服務或將使用櫃台服務，我們將會追蹤您的航班，並根據您新的抵達時間來自動調整您的乘車時間。提醒您，請您務必在預約時提供航班號碼；若您已經預約了，您可以在「管理我的訂單」補充此資訊。
                                        班機降落後，您的司機會等候您 45 分鐘，讓您有充足時間可以通過安檢與提領行李。我們會在您降落時透過簡訊與 Email
                                        發送司機的電話號碼給您，因此如果您覺得無法在 45
                                        分鐘內抵達入境大廳的話，您可以通知司機。請務必留意，如果您的司機沒有收到延遲抵達的通知，司機可能會在45 分鐘過後離開。
                                        若您預約了經濟型服務，您只需在班機降落後依循預訂確認函中的指示行動就好。我們會在您降落後發送 Email 與簡訊給您，如需協助，請撥打 Email
                                        與簡訊中的緊急聯絡電話與我們聯繫。
                                        <h4>如何與司機會合？</h4>
                                        請查看您的預訂確認函，信中會有指示說明會合的確切地點。在分配司機給您後，我們會發送司機的姓名、電話號碼及其所屬公司的資訊給您，而司機也將能與您聯繫，因此請在乘車當日隨時留意您的電話。
                                        接近乘車時間時，請留意內含前往「Pick-up Companion」連結的簡訊－您可以透過「Pick-up
                                        Companion」隨時隨地輕鬆查看所有乘車相關資訊。
                                        <h4>我把東西留在車上了，我該跟誰聯絡？</h4>
                                        我們建議您使用您在乘車前收到的電話號碼直接致電給司機。若您需要更多協助，請與我們聯繫，我們會盡力協助您找回遺失的物品。
                                        <h4>我會與其他旅伴乘車，但我們會搭乘不同班機抵達，該怎麼預約？</h4>
                                        預約時，我們會請您提供航班號碼。請提供最晚降落的航班號碼。若其他班機意外延遲抵達，司機將不會知道，因此可能會錯過搭乘該班機的乘客。
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>

                        <div class="ariport-taxi3">
                            <el-collapse>
                                <el-collapse-item title=" 3. 付款資訊" name="1">
                                    <template #title>
                                        <div style="font-size: 1.15em; font-weight: bold;">3. 付款資訊</div>
                                    </template>
                                    <div class="inner_block">
                                        <h4>我可以用哪些方式付款？</h4>
                                        我們接受大多數的簽帳卡與信用卡，如 Mastercard、Visa 與 American
                                        Express。我們的服務需要您預先付款，代表您須在出發前於線上預約乘車並付款，因此您會在預約時看到偏好的付款方式是否可用。
                                        <h4>我何時需要付款？</h4>
                                        我們所有的私人接駁服務皆須事先付款，代表您在預訂時就會在線上付款。付款流程相當安全，且我們接受大多數主流信用卡與簽帳卡、PayPal，您也可使用
                                        Booking.com Wallet
                                        中符合條件的獎勵。
                                        <h4>我可以要求開立訂單發票或收據嗎？</h4>
                                        我們不能開立發票，但您的預訂確認函包含了行程資訊、乘客姓名與付款金額，為有效的收據。
                                        由於我們是根據「旅遊業者差額計畫」（Tour Operators’ Margin
                                        Scheme）來營運業務，因此您無法為您的訂單申請任何加值稅。如欲了解更多相關資訊，請參閱英國稅務海關總署的旅遊業者差額計畫。
                                        <h4>我已經取消訂單了，什麼時候會收到退款？</h4>
                                        若您是在搭車時間的至少 24 小時前取消訂單，您會在 5 個工作天之內收到全額退款。我們會透過您原先使用的付款方式將款項退還給您。
                                        <h4>如果我應該要收到一筆退款但卡片已過期，我該怎麼做？</h4>
                                        若您的卡片已失效，該筆退款應該還是會存入您的帳戶，但如果在 7 個工作天後您仍沒看到該款項，請聯繫您的銀行或發卡單位尋求進一步協助。
                                        若您在銀行或發卡商已經沒有有效的帳戶，那麼請直接聯繫相關銀行或發卡商來領取您的退款。我們會要求您直接聯繫他們，是因為該退款將會改發放至您的銀行或發卡單位。
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>

                        <div class="ariport-taxi4">
                            <el-collapse>
                                <el-collapse-item title=" 4. 無障礙設施與其他" name="1">
                                    <template #title>
                                        <div style="font-size: 1.15em; font-weight: bold;">4. 無障礙設施與其他</div>
                                    </template>
                                    <div class="inner_block">
                                        <h4>我有使用輪椅，你們會提供哪些協助？</h4>
                                        我們會盡力滿足您的任何旅遊要求。建議您直接與我們聯繫，我們才能根據您的需求提供合適的選項給您參考。
                                        <h4>我可以預約兒童安全座椅嗎？</h4>
                                        可以，如果需要兒童安全座椅，請於預約時在「給司機的留言」處告訴我們。部分服務供應商可能會另外索取租用兒童安全座椅的費用，在此情況下我們會聯繫您並告知此事及安排付款事宜。若您想自行攜帶兒童安全座椅，也沒問題－請與您的航空公司確認，他們可能會願意讓您免費攜帶兒童安全座椅。
                                        在某些目的地，法律規定孩童搭乘交通工具時必須使用兒童安全座椅或兒童保護裝置。我們一定會試著在預約流程時告知您相關資訊，但您仍有責任了解旅遊目的地的當地法規。
                                        重要資訊：若您無法為孩童申請兒童安全座椅，我們可能無法在規定必須使用兒童安全座椅的目的地為您提供接送服務。
                                        <h4>我可以攜帶寵物乘車嗎？</h4>
                                        我們也很喜歡動物，但很抱歉，我們無法讓寵物一同乘車。
                                        <h4>我可以代他人預約嗎？</h4>
                                        可以。提醒您，您輸入的聯絡資訊會用來接收關於訂單的重要資訊。我們強烈建議您提供乘客的手機號碼，司機才能在約定接送的時間與乘客聯繫（如有需要）。
                                        <h4>司機會使用我們的語言嗎？</h4>
                                        我們的合作夥伴通常是在他們所服務的地區，因此我們無法保證您的司機會使用您的語言。
                                        儘管如此，若您有任何溝通方面的問題，我們的客服團隊提供多種語言的服務，他們會很樂意協助您。您可以透過電話聯繫。
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>


                        <div class="ariport-taxi5">
                            <el-collapse>
                                <el-collapse-item title=" 5. 新型冠狀病毒疫情相關支援" name="1">
                                    <template #title>
                                        <div style="font-size: 1.15em; font-weight: bold;">5. 新型冠狀病毒疫情相關支援</div>
                                    </template>
                                    <div class="inner_block">
                                        <h4>一輛車最多可載幾位乘客？</h4>
                                        這取決於預約時您選的車型有多大。我們提供多種車型，從最多可載 4 人的標準計程車，到最多可載 16 人的多功能休旅車與小巴都有。
                                        任何關於社交距離的要求都會依照當地政府指示來實施，因此建議您查看目的地目前有哪些規範。
                                        <h4>目前有哪些安全措施？</h4>
                                        我們想向您保證，對我們來說，沒有任何事情比顧客的安全與健康還來得重要。
                                        這也是為什麼我們會與世界各地的合作夥伴有密切的合作，協助他們遵循政府的最新建議，來替顧客維持乾淨且衛生的環境。
                                        我們要求司機保持安全距離並定期清潔車輛，司機與顧客也應依照目前法規戴上口罩。提醒您，在部分地區，想乘車卻沒有戴口罩的話，司機可能會無法為您提供服務。
                                        <h4>我可以去哪裡取得關於訂單的最新資訊？</h4>
                                        如欲了解關於訂單的任何詳細資訊，只需使用訂單編號及用於預約的電子信箱登入，或使用確認函或支援中心裡的「管理我的訂單」連結即可。接著您將能找到訂單資訊以及了解如何取消或修改訂單，如需任何協助，您也能與我們聯繫。
                                        <h4>如果我想要因新冠肺炎相關原因而更改或取消訂單，所適用的政策規定為何？</h4>
                                        若您因為當地規定或國際限制而無法旅行，您最晚可在乘車時間的 24 小時前更改或取消訂單。
                                        只需使用訂單編號及預約時所用的電子信箱登入，或使用「管理我的訂單」連結即可。
                                        您最晚可於乘車時間的 24 小時前更改訂單。
                                        若在乘車時間的至少 24 小時前取消旅程，您會在 5
                                        個工作天內收到全額退款，款項會透過原先的付款方式退還給您。如有任何關於訂單的問題，請使用我們的線上聯繫表單。本站客服團隊 24
                                        小時全年無休，並且通常會在 2 個小時內回覆。
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>

                        <div class="ariport-taxi6">
                            <el-collapse>
                                <el-collapse-item title=" 6. 價格" name="1">
                                    <template #title>
                                        <div style="font-size: 1.15em; font-weight: bold;">6. 價格</div>
                                    </template>
                                    <div class="inner_block">
                                        <h4>價格包含了哪些費用？</h4>
                                        Booking.com 提供許多種不同類型的服務供您預約，各類服務的費用都包含了所有稅費、手續費、小費及過路費。
                                        若您預約包含了迎賓接機的機場乘車服務，您的費用也會涵蓋航班追蹤服務及 45 分鐘的等候時間（自您的班機降落後算起）；至於在機場以外地點上車的服務，我們會有 15
                                        分鐘的等候時間（自預定的乘車時間算起）。
                                        我們在部分目的地也提供經濟型機場乘車服務，其中移除了迎賓接機服務的相關費用，讓您降低交通費的支出。修改行程及特殊要求可能會產生額外費用。
                                        <h4>你們會收取交易手續費嗎？</h4>
                                        我們不會針對任何信用卡或簽帳卡的付款收取任何費用。若您付款時想使用的幣別不同於您的銀行帳戶或信用卡，相關供應商可能會向您收取費用。
                                        <h4>我可以在付款時選擇要使用的幣別嗎？</h4>
                                        可以。我們的網站上有個選項可讓您選擇支付時想使用的幣別。您將以所選幣別來付款，而非取車地點當地所用的幣別。
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>

                    </div>
                </el-tab-pane>
                <el-tab-pane label="保險" name="4">
                    <template #label>
                        <div class="insurance-icon">
                            <i class="bi bi-shield-check"></i>
                            <span style="font-size: 12px;">保險</span>
                        </div>
                    </template>
                    <div class="insurance">
                        <div class="insurance1">
                            <el-collapse>
                                <el-collapse-item title=" 1. 旅遊保險-申請理賠" name="1">
                                    <template #title>
                                        <div style="font-size: 1.15em; font-weight: bold;">1. 旅遊保險-申請理賠</div>
                                    </template>
                                    <div class="inner_block">
                                        <h4>我要如何申請理賠？</h4>
                                        若您想就已發生的事件提出理賠申請，請務必保留任何文件或其他證明（警方報告、醫療報告、帳單收據、損壞相片等）。如要提出申請，請登入您的
                                        PerfectTrip.com
                                        帳戶，並前往「訂單」／「我的旅程」，選擇「旅遊保險」，並點選「提出理賠申請」。若您沒有 PerfectTrip.com
                                        帳戶，請按上方的房子標示，並點「我找不到訂單」，然後選擇「住宿」或「機票」，輸入您的訂單資料，點選「查看訂單內容」，選擇「檢視預訂確認函」，點選「旅遊保險」，然後按下「提出理賠申請」。請查看您的保單條款了解完整資訊。
                                        <h4>意外之後的返家費用是否在保障之內？</h4>
                                        是，若您在國外，保單將提供緊急醫療的返家費用。適用例外狀況。
                                        <h4>若遇到緊急醫療的狀況，我需要做什麼？</h4>
                                        請聯絡緊急救助服務，您可以在保單條款找到聯絡電話。您也可以登入 PerfectTrip.com 帳戶，前往「訂單」／「我的旅程」，選擇「旅遊保險」。
                                        他們可能會詢問您的旅程詳細資料，如：保單編號、出發和回程日期，您可以在保險證明文件（又稱為「保險證明」）中找到資訊。
                                        <h4>我的個人物品遺失、遭竊或損壞，我該做什麼？</h4>
                                        請盡快向警察回報任何失竊或遺失的狀況，並索取警方書面報告。
                                        若您認為航空公司、住宿單位或其他公司有任何失竊、遺失或損壞的責任，請以書面的形式向他們回報。
                                        請記得保留任何報告、損壞相片、票券、行李吊牌等文件資料。

                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>

                        <div class="insurance2">
                            <el-collapse>
                                <el-collapse-item title=" 2. 旅遊保險-保障改改改" name="2">
                                    <template #title>
                                        <div style="font-size: 1.15em; font-weight: bold;">2. 旅遊保險-保障</div>
                                    </template>
                                    <div class="inner_block">
                                        <h4>這個保單有自負額嗎？</h4>
                                        這會依照您的理賠申請而定。如需更多資訊，請查看保單條款的保障內容。
                                        <h4>旅遊保險有保障什麼項目？</h4>
                                        若您居住在加拿大
                                        旅遊險將保障您和其他任何與您同行的被保險人，包括您的個人物品和您在 PerfectTrip.com
                                        上預訂的訂單，其提供旅程取消、旅程中斷、遣返、緊急醫療支出（部分情況）和更多項目的保障，請查看您的保單條款了解詳細資料。
                                        若您住在其他地方
                                        旅遊險將保障您和其他任何與您同行的被保險人，包括您的個人物品和事先預訂的旅遊安排，其提供旅程取消、旅程中斷、遣返、緊急醫療支出（部分情況）和更多項目的保障，請查看您的保單條款了解詳細資料。
                                        <h4>我在哪裡有受到保障？</h4>
                                        在保險證明文件（又稱為「保險證明」）上所示的旅行地區，您的保單將提供保障－也就是依照您在 PerfectTrip.com 預訂的住宿地點（或機票目的地）而定。
                                        <h4>有任何例外狀況嗎？</h4>
                                        有，整份保單有一般例外情況；保單的特定部分則有特殊例外情況。請詳閱保單條款的完整資料。
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>

                        <div class="insurance3">
                            <el-collapse>
                                <el-collapse-item title=" 3. 旅遊保險-保單條款" name="13">
                                    <template #title>
                                        <div style="font-size: 1.15em; font-weight: bold;">3. 旅遊保險-保單條款</div>
                                    </template>
                                    <div class="inner_block">
                                        <h4>保險起始與結束日為何時？</h4>
                                        旅遊取消保障會從您購買保險時開始，並在旅程開始時結束。
                                        其餘的保障將從您啟程日期開始，並於回程日期結束－您可在保險證明文件找到該資訊。若已在本站預訂單程機票，請查看您的保險證明文件。
                                        <h4>我沒有收到保險證明文件，可以去哪找？</h4>
                                        當購買保險時，您應會收到由保險供應商寄給您的電子郵件。若沒有在收件匣找到，請檢查看看廣告郵件或垃圾信件匣。
                                        若您仍沒有找到，請登入 PerfectTrip.com 帳戶，前往「訂單／我的旅程」>「旅遊保險」，即可找到保險相關文件的連結，也可確認您給我們的電子信箱。
                                        <h4>我可以更改我的保險嗎？</h4>
                                        您無法更改保單－但實際上仍會有一些彈性，如下面常見問答中的說明：
                                        <br>1. 若我更改旅遊日期，仍會受到保障嗎？
                                        <br>2. 若我更改目的地，仍會受到保障嗎？
                                        <br>3. 在我購買保險之後，還能更改被保險人嗎？或可以為其他旅客投保嗎？
                                        <h4>若我更改旅遊日期，仍會受到保障嗎？</h4>
                                        首先，您可在保險證明文件中找到保險期間。
                                        若您居住在歐洲經濟區或英國
                                        若您將啟程日和／或回程日移動了一天，只要整個行程沒有變更長，您仍會受到保障。若您的日期更改不只這樣，您將需取消保單，因為您將不再受保障。
                                        若您因此要取消保單，最晚可在啟程日的兩天前取消，並可獲得保險費全額退費。
                                        若您住在其他地方
                                        若您的啟程日和／或回程日的變更範圍在 14 天內，只要整個行程沒有變更長，您仍會受到保障。若您的日期更改不只這樣，您將需取消保單，因為您將不再受保障。
                                        您可以在購買後的 14 天內取消保單（若您居住在加拿大則是 10 天內），並可獲得保險費全額退費，除非您的旅程已開始或您希望申請理賠。
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>

                        <div class="insurance4">
                            <el-collapse>
                                <el-collapse-item title=" 4. 旅遊保險-一般問題" name="4">
                                    <template #title>
                                        <div style="font-size: 1.15em; font-weight: bold;">4. 旅遊保險-一般問題</div>
                                    </template>
                                    <div class="inner_block">
                                        <h4>我可以取消保單嗎？</h4>
                                        您可以在購買後的 14 天內取消保單（若您居住在加拿大則是 10 天內），但若旅程已開始或您希望申請理賠則無法取消。
                                        若希望取消，請登入您的 Booking.com 帳戶，前往「訂單／我的旅程」，選擇「旅遊保險」，然後點選「取消保險」。若您沒有 Booking.com
                                        帳戶，請點選上方的房屋圖標，點擊「我找不到訂單」，然後選擇「住宿」或「機票」，輸入您的訂單資訊，選擇「查看訂單內容」>「檢視預訂確認函」>「旅遊保險」，然後點選「取消保點」。
                                        <h4>我如何對保險提出申訴？</h4>
                                        若您的申訴是關於保險本身，請聯繫保險供應商。若申訴是有關保險的販售－若您居住在歐洲經濟區或英國，請聯繫 Booking.com
                                        Distribution，若居住在其他地區，請連繫保險供應商。您將可在保單條款中找到申訴流程與聯繫資訊。
                                        <h4>我可以在哪裡找到保險文件？</h4>
                                        您可以在 Booking.com 網站或 APP
                                        上找到保單條款與其他相關文件的連結，就在保險的購買頁面。若已經購買，相關文件將附在保險供應商發送給您的電子郵件中－您可登入
                                        Booking.com 帳戶，前往「訂單／我的旅程」>「旅遊保險」，即可找到文件連結。
                                        <h4>若我取消保單，可以退款嗎？</h4>
                                        若在購買後的 14 天內取消保單（若您居住在加拿大則是 10 天內），您的保險費將全額退款，除非您的旅程已開始或您希望申請理賠。
                                        退款將以您當初購買旅遊保險所支付的幣別退給您，即便您的保險證明文件上以不同幣別顯示價格。您的發卡機構可能會收取國外交易手續費。
                                        <br>取消保單後即會馬上處理退款事宜。您將在 7－12 天內收到退款。

                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>

                    </div>
                </el-tab-pane>
                <el-tab-pane label="其他" name="5">
                    <template #label>
                        <div class="other-icon">
                            <i class="bi bi-three-dots"></i>
                            <span style="font-size: 12px;">其他</span>
                        </div>
                    </template>
                    <div class="others">
                        <div class="others1">
                            <el-collapse>
                                <el-collapse-item title="1. 我要如何跟booking.com聯絡?" name="1">
                                    <template #title>
                                        <div style="font-size: 1.15em; font-weight: bold;">1. 我要如何跟booking.com聯絡?</div>
                                    </template>
                                    <div class="inner_block">
                                        <h4>我要如何跟 PerfectTrip.com 聯絡？</h4>
                                        請前往支援中心，選擇您需要協助的訂單，若您需要與客服人員通話，您可以撥打優先客服支援專線跟我們聯絡（如有登入）。您也可以直接打電話或傳訊息給住宿方，或者發送訊息給客服。
                                        若您找不到訂單，請在支援中心的主頁選擇「我找不到訂單」，並選擇您預訂的訂單類型（如：住宿、租車或機票），接下來，會詢問您要發送訊息，或是輸入您的確認碼和 PIN
                                        碼。若您沒有這些資訊，仍然可以發送訊息或打電話給客服人員。
                                        請登入支援中心，並選擇您需要協助的訂單，以便我們安排合適的協助。您可以發送訊息給住宿方、透過訊息或電話聯絡客服。
                                        若找不到需要協助的訂單，您可以輸入確認碼，或是在支援中心選擇「我找不到訂單」以重新發送確認函。
                                        您仍可從支援中心獲得協助，只要在主頁選擇「不登入帳戶繼續 」，並輸入您的確認碼和 PIN 碼，以便打電話或發送訊息給客服。
                                    </div>
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

    .question1 {
        // border: 1px solid #ccc;

    }

    .loading-with-icon {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 10px;
        padding: 0 15px;
    }

    .loading-with-icon i {
        font-size: 24px;
    }

    .lodging {
        border: 1px solid #0000002a;
        // padding: 10px 20px;
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

    .car-rent-icon {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 10px;
        padding: 0 15px;
    }

    .car-rent-icon i {
        font-size: 24px;
    }

    .car-rent {
        border: 1px solid #0000002a;
        border-radius: 8px;

        .car-rentA {
            font-size: 18px;
            padding: 20px 20px;
            line-height: 50px;
        }

        .car-rent1 {
            border: 1px solid #0000002a;
            border-right-color: transparent;
            border-left-color: transparent;
            padding: 10px 20px;
        }

        .car-rent2 {
            border: 1px solid #0000002a;
            border-right-color: transparent;
            border-left-color: transparent;
            padding: 10px 20px;
        }

        .car-rent3 {
            border: 1px solid #0000002a;
            border-right-color: transparent;
            border-left-color: transparent;
            padding: 10px 20px;
        }

        .car-rent4 {
            border: 1px solid #0000002a;
            border-right-color: transparent;
            border-left-color: transparent;
            padding: 10px 20px;
        }

        .car-rent5 {
            border: 1px solid #0000002a;
            border-right-color: transparent;
            border-left-color: transparent;
            padding: 10px 20px;
        }

        .car-rent6 {
            border: 1px solid #0000002a;
            border-right-color: transparent;
            border-left-color: transparent;
            padding: 10px 20px;
        }

        .car-rent7 {
            border: 1px solid #0000002a;
            border-right-color: transparent;
            border-left-color: transparent;
            padding: 10px 20px;
        }

        .car-rent8 {
            border: 1px solid #0000002a;
            border-right-color: transparent;
            border-left-color: transparent;
            padding: 10px 20px;
        }

        .car-rent9 {
            border: 1px solid #0000002a;
            border-right-color: transparent;
            border-left-color: transparent;
            padding: 10px 20px;
        }

        .car-rent10 {
            border: 1px solid #0000002a;
            border-right-color: transparent;
            border-left-color: transparent;
            padding: 10px 20px;
        }
    }

    .air-ticket-icon {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 10px;
        padding: 0 15px;
    }

    .air-ticket-icon i {
        font-size: 24px;
    }

    .air-ticket {
        border: 1px solid #0000002a;
        // padding: 10px 20px;
        border-radius: 8px;

        .air-ticketA {
            font-size: 18px;
            padding: 20px;
            line-height: 50px;
        }

        .air-ticket1 {
            border: 1px solid #0000002a;
            border-right-color: transparent;
            border-left-color: transparent;
            padding: 10px 20px;
        }

        .air-ticket2 {
            border: 1px solid #0000002a;
            border-right-color: transparent;
            border-left-color: transparent;
            padding: 10px 20px;
        }

        .air-ticket3 {
            border: 1px solid #0000002a;
            border-right-color: transparent;
            border-left-color: transparent;
            padding: 10px 20px;
        }

        .air-ticket4 {
            border: 1px solid #0000002a;
            border-right-color: transparent;
            border-left-color: transparent;
            padding: 10px 20px;
        }

        .air-ticket5 {
            border: 1px solid #0000002a;
            border-right-color: transparent;
            border-left-color: transparent;
            padding: 10px 20px;
        }

        .air-ticket6 {
            border: 1px solid #0000002a;
            border-right-color: transparent;
            border-left-color: transparent;
            padding: 10px 20px;
        }

        .air-ticket7 {
            border: 1px solid #0000002a;
            border-right-color: transparent;
            border-left-color: transparent;
            padding: 10px 20px;
        }

        .air-ticket8 {
            border: 1px solid #0000002a;
            border-right-color: transparent;
            border-left-color: transparent;
            padding: 10px 20px;
        }

        .air-ticket9 {
            border: 1px solid #0000002a;
            border-right-color: transparent;
            border-left-color: transparent;
            padding: 10px 20px;
        }
    }

    .ariport-taxi {
        border: 1px solid #0000002a;
        // padding: 10px 20px;
        border-radius: 8px;

        .ariport-taxiA {
            font-size: 18px;
            padding: 20px;
            line-height: 50px;
        }

        .ariport-taxi1 {
            border: 1px solid #0000002a;
            border-right-color: transparent;
            border-left-color: transparent;
            padding: 10px 20px;
        }

        .ariport-taxi2 {
            border: 1px solid #0000002a;
            border-right-color: transparent;
            border-left-color: transparent;
            padding: 10px 20px;
        }

        .ariport-taxi3 {
            border: 1px solid #0000002a;
            border-right-color: transparent;
            border-left-color: transparent;
            padding: 10px 20px;
        }

        .ariport-taxi4 {
            border: 1px solid #0000002a;
            border-right-color: transparent;
            border-left-color: transparent;
            padding: 10px 20px;
        }

        .ariport-taxi5 {
            border: 1px solid #0000002a;
            border-right-color: transparent;
            border-left-color: transparent;
            padding: 10px 20px;
        }

        .ariport-taxi6 {
            border: 1px solid #0000002a;
            border-right-color: transparent;
            border-left-color: transparent;
            padding: 10px 20px;
        }
    }

    .airport-taxi-icon {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 10px;
        padding: 0 15px;
    }

    .airport-taxi-icon i {
        font-size: 24px;
    }

    .insurance-icon {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 10px;
        padding: 0 15px;
    }

    .insurance-icon i {
        font-size: 24px;
    }

    .insurance {
        border: 1px solid #0000002a;
        // padding: 10px 20px;
        border-radius: 8px;

        .insuranceA {
            font-size: 18px;
            padding: 20px;
            line-height: 50px;
        }

        .insurance1 {
            border: 1px solid #0000002a;
            border-right-color: transparent;
            border-left-color: transparent;
            padding: 10px 20px;
        }

        .insurance2 {
            border: 1px solid #0000002a;
            border-right-color: transparent;
            border-left-color: transparent;
            padding: 10px 20px;
        }

        .insurance3 {
            border: 1px solid #0000002a;
            border-right-color: transparent;
            border-left-color: transparent;
            padding: 10px 20px;
        }

        .insurance4 {
            border: 1px solid #0000002a;
            border-right-color: transparent;
            border-left-color: transparent;
            padding: 10px 20px;
        }
    }

    .other-icon {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 10px;
        padding: 0 15px;
    }

    .other-icon i {
        font-size: 24px;
    }

    .others {
        border: 1px solid #0000002a;
        // padding: 10px 20px;
        border-radius: 8px;

        .othersA {
            font-size: 18px;
            padding: 20px;
            line-height: 50px;
        }

        .others1 {
            border: 1px solid #0000002a;
            border-right-color: transparent;
            border-left-color: transparent;
            padding: 10px 20px;
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