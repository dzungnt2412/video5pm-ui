<template>
  <div class="page contest">
    <div class="page-content container">
      <div class="row">
        <div class="col-xl-12">
          <VclCode v-if="isLoading"></VclCode>
          <div class="card">
            <div class="card-body">
              <div class="container" style="padding:0 10%">
                <div class="contest-header">
                  <h3 class="text-center"
                    >Bạn chỉ còn cách chiến thắng không xa</h3
                  >
                  <div class="text-center">
                    Rất nhiều giải thưởng có giá trị đang chờ đợi. Hãy mở khóa
                    tiềm năng của bạn.
                  </div>
                </div>
                <carousel
                  :perPage="1"
                  :navigateTo="mapActiveSlide(currentPoint.point)"
                  :navigationEnabled="true"
                  navigationNextLabel="<i class='material-icons'>keyboard_arrow_right</i>"
                  navigationPrevLabel="<i class='material-icons'>keyboard_arrow_left</i>"
                >
                  <slide v-for="(item, i) in prize" :key="i">
                    <div class="row" style="margin-bottom:50px">
                      <div class="col-2">
                        <img
                          :src="getImgUrl(item.start.icon)"
                          class="img-responsive"
                        />
                        <div class="text-center">
                          <strong>{{ item.start.name }}</strong>
                          <br />
                          <span>{{ item.start.value }}</span>
                        </div>
                      </div>
                      <div class="offset-8 hidden-md hidden-xs hidden-sm"></div>
                      <div class="col-2">
                        <img
                          :style="{ 'margin-top': item.end.margin_icon + 'px' }"
                          :src="getImgUrl(item.end.icon)"
                          class="img-responsive"
                        />
                        <div
                          class="text-center"
                          :style="{ 'margin-top': item.end.margin_text + 'px' }"
                        >
                          <strong>{{ item.end.name }}</strong>
                          <br />
                          <span>{{ item.end.value }}</span>
                        </div>
                      </div>
                    </div>
                    <div
                      v-if="currentPoint.point < item.start.point"
                      class="statistics"
                    >
                      <div class="unit-progress">
                        <div class="progress">
                          <div
                            class="progress-bar progress-bar-striped"
                            role="progressbar"
                            style="width:0%"
                            aria-valuenow="50"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                          </div>
                        </div>
                        <img
                          src="@/assets/contest/icon_4.png"
                          style="position: absolute;width: auto;top: -10px;left: -20px;"
                        />
                        <img
                          src="@/assets/contest/icon_4.png"
                          style="position: absolute;width: auto;top: -10px;right: -20px;"
                        />
                        <span class="unit-progress__current" style="left:0"
                          ><b>{{ currentPoint.point | formatNumber }}</b>
                          Point</span
                        >
                        <span class="unit-progress__from"
                          ><b>{{ item.start.point | formatNumber }}</b>
                          Point</span
                        >
                        <span class="unit-progress__to"
                          ><b>{{ item.end.point | formatNumber }}</b>
                          Point</span
                        >
                      </div>
                    </div>
                    <div
                      v-if="currentPoint.point > item.end.point"
                      class="statistics"
                    >
                      <div class="unit-progress">
                        <div class="progress">
                          <div
                            class="progress-bar progress-bar-striped"
                            role="progressbar"
                            style="width:100%"
                            aria-valuenow="50"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                          </div>
                        </div>
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style="position: absolute;width: auto;top: -9px;left: -20px;"
                        >
                          <circle cx="16" cy="16" r="16" fill="#0554F2" />
                        </svg>
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style="position: absolute;width: auto;top: -9px;right: -20px;"
                        >
                          <circle cx="16" cy="16" r="16" fill="#0554F2" />
                        </svg>
                        <span class="unit-progress__current" style="right:0"
                          ><b>{{ currentPoint.point | formatNumber }}</b>
                          Point</span
                        >
                        <span class="unit-progress__from"
                          ><b>{{ item.start.point | formatNumber }}</b>
                          Point</span
                        >
                        <span class="unit-progress__to"
                          ><b>{{ item.end.point | formatNumber }}</b>
                          Point</span
                        >
                      </div>
                    </div>
                    <div
                      v-if="
                        item.start.point <= currentPoint.point &&
                          currentPoint.point <= item.end.point
                      "
                      class="statistics"
                    >
                      <div class="unit-progress">
                        <div class="progress">
                          <div
                            class="progress-bar progress-bar-striped"
                            role="progressbar"
                            :style="{
                              width:
                                ((currentPoint.point - item.start.point) *
                                  100) /
                                  (item.end.point - item.start.point) +
                                '%',
                            }"
                            aria-valuenow="50"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                          </div>
                        </div>
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style="position: absolute;width: auto;top: -9px;left: -20px;"
                        >
                          <circle cx="16" cy="16" r="16" fill="#0554F2" />
                        </svg>
                        <img
                          src="@/assets/contest/icon_4.png"
                          style="position: absolute;width: auto;top: -10px;right: -20px;"
                        />
                        <span
                          class="unit-progress__current"
                          :style="{
                            left:
                              ((currentPoint.point - item.start.point) * 100) /
                                (item.end.point - item.start.point) +
                              '%',
                          }"
                          ><b>{{ currentPoint.point | formatNumber }}</b>
                          Point</span
                        >
                        <span class="unit-progress__from"
                          ><b>{{ item.start.point | formatNumber }}</b>
                          Point</span
                        >
                        <span class="unit-progress__to"
                          ><b>{{ item.end.point | formatNumber }}</b>
                          Point</span
                        >
                      </div>
                    </div>
                    <p class="statistics_desc text-center mt-10">
                      Year End Contest bắt đầu từ 0h00’ ngày 01/10/2020 (GMT+7)
                      – 23h59’ ngày 31/12/2020 (GMT+7).
                      <br />
                      Tổng điểm (points) sẽ được cập nhật trên hệ thống sau
                      23:59’ mỗi ngày
                      <br />
                      <a
                        href="http://lionnix.com/contest"
                        class="font-weight-600"
                      >
                        Tìm hiểu thêm
                      </a>
                    </p>
                  </slide>
                </carousel>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-body contest-intro">
              <div class="page-header">
                <a href="" class="font-weight-600">GIỚI THIỆU VỀ</a>
                <h3>YEAR END CONTEST 2020</h3>
                <p class="mt-20">
                  <b>Đối tượng tham gia:</b> Dành cho tất cả sellers có tài
                  khoản được active trên hệ thống của Lionnix trên phạm vi toàn
                  quốc.
                </p>
              </div>
              <div class="page-content">
                <div>
                  <h4 class="head-title">Thời gian</h4>
                  <ul>
                    <li>
                      Thời gian diễn ra:
                      <strong
                        >Từ 0h00’ ngày 01/10/2020 (GMT+7) – 23h59’ ngày
                        31/12/2020 (GMT+7)</strong
                      >
                    </li>
                    <li
                      >Thời gian công bố kết quả và trao thưởng: Giải thưởng sẽ
                      được công bố vào ngày 15/01/2021 và trao thưởng trong vòng
                      1 tháng kể từ ngày công bố giải thưởng</li
                    >
                  </ul>
                </div>
                <div class="mt-60">
                  <h4 class="head-title">Cách thức tham gia</h4>
                  <ul>
                    <li
                      >Sellers đã có tài khoản active trên hệ thống Lionnix,
                      truy cập vào giao diện seller, click vào
                      <strong>“Join the Contest”</strong> để chính thức tham gia
                      chương trình.</li
                    >
                    <li
                      >Đăng ký thông tin tham gia tại link:
                      <a
                        class="font-weight-600"
                        href="https://forms.gle/sjFeCfTmmpmwfsLa9"
                        >https://forms.gle/sjFeCfTmmpmwfsLa9</a
                      ></li
                    >
                    <li>
                      Hình thức tham gia:
                      <div class="row mt-15">
                        <div class="col-lg-6 col-sm-12">
                          <div class="box-rule">
                            <h5><i class="border-head"></i>Cá nhân</h5>
                            <p class="mt-5"
                              >Sellers có thể chọn một trong hai hình thức:</p
                            >
                            <p
                              ><strong>Dự thi trên 1 tài khoản:</strong> 1
                              seller đăng ký tham dự với 1 tài khoản duy
                              nhất.</p
                            >
                            <p
                              ><strong>Dự thi trên nhiều tài khoản: </strong>1
                              seller có thể tích hợp nhiều tài khoản để cộng gộp
                              điểm quy đổi thành phẩn thưởng. Seller đăng ký với
                              support danh mục các tài khoản cộng gộp trước khi
                              bắt đầu tính điểm.
                            </p>
                            <blockquote class="mt-20">
                              <p>
                                <i
                                  >Các thành viên nếu đã tham gia hình thức
                                  <strong>Cá nhân</strong> thì không được tham
                                  gia ở hình thức Đội nhóm.
                                </i>
                              </p>
                              <p>
                                <i>
                                  Khi tổng kết điểm, 1 seller chỉ được quy đổi
                                  và nhận một giải thưởng cao nhất tương ứng với
                                  số điểm quy đổi được.
                                </i>
                              </p>
                            </blockquote>
                          </div>
                        </div>
                        <div class="col-lg-6 col-sm-12">
                          <div class="box-rule">
                            <h5><i class="border-head"></i>Đội nhóm</h5>
                            <p class="mt-5"
                              >Sellers có thể tạo đội nhóm để tăng tỷ lệ thắng
                              giải bằng cách:</p
                            >
                            <p
                              ><strong>Team leader thống nhất</strong> và tổng
                              hợp danh sách thành viên trong nhóm (gồm tên thành
                              viên + user name).</p
                            >
                            <p
                              ><strong>Đăng ký trực tiếp với support</strong>
                              của team leader danh sách này để được cập nhật
                              trên hệ thống.</p
                            >
                            <blockquote>
                              <p
                                ><i
                                  >Các thành viên nếu đã tham gia hình thức
                                  <strong>Đội nhóm</strong> thì không được tham
                                  gia ở hình thức Cá nhân.</i
                                ></p
                              >
                              <p
                                ><i
                                  >Khi tổng kết điểm, 1 team chỉ được quy đổi và
                                  nhận một giải thưởng cao nhất tương ứng với số
                                  điểm quy đổi được.</i
                                ></p
                              >
                              <p
                                ><i
                                  >Support/Sales sẽ cập nhật trực tiếp điểm các
                                  team hàng tuần và hàng tháng.</i
                                ></p
                              >
                              <p
                                ><i
                                  >Thời gian mở đăng ký đội nhóm: từ 01/10 –
                                  10/10</i
                                ></p
                              >
                            </blockquote>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="row mt-45">
                  <div class="col-lg-6">
                    <table
                      class="table table-full-width table-borderless item-poin-tbl"
                    >
                      <tr>
                        <td colspan="2">
                          <h4 class="head-title">Tiêu chí tính điểm</h4>
                        </td>
                      </tr>
                      <tr>
                        <td>CƠ CHẾ QUY ĐỔI ĐIỂM</td>
                        <td class="text-right">1 Order Item = 1 Point</td>
                      </tr>
                      <tr>
                        <td>
                          <svg
                            width="4"
                            height="4"
                            viewBox="0 0 4 4"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect width="4" height="4" fill="#C4C4C4" />
                          </svg>
                          <b>1 Point</b></td
                        >
                        <td class="text-right">
                          <svg
                            width="4"
                            height="4"
                            viewBox="0 0 4 4"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect width="4" height="4" fill="#C4C4C4" />
                          </svg>
                          <b>2 Point</b>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>Tshirt</span>
                        </td>
                        <td class="text-right">Zip Hoodie</td>
                      </tr>
                      <tr>
                        <td><span>Hawaii</span></td>
                        <td class="text-right">Fleece Hoodie</td>
                      </tr>
                      <tr>
                        <td><span> Sweat Shirt</span></td>
                        <td class="text-right">Jacket</td>
                      </tr>
                      <tr>
                        <td><span>Polo</span></td>
                        <td class="text-right">Bomber</td>
                      </tr>
                      <tr>
                        <td><span>Tanktop</span></td>
                        <td class="text-right"
                          >Quilt (Size Super King, King, Queen)</td
                        >
                      </tr>
                      <tr>
                        <td><span> Hollow Tanktop</span></td>
                        <td class="text-right">Rug (Size M, L)</td>
                      </tr>
                      <tr>
                        <td><span>Croptop</span></td>
                        <td class="text-right">Blanket (Size Large)</td>
                      </tr>
                      <tr>
                        <td><span>Legging</span></td>
                        <td class="text-right">Facemask (Pack 10)</td>
                      </tr>
                      <tr>
                        <td colspan="2"><span>Short 3d</span></td>
                      </tr>
                      <tr>
                        <td colspan="2"><span>Cross Shoulder Shirt</span></td>
                      </tr>
                      <tr>
                        <td colspan="2"><span>Hoodie</span></td>
                      </tr>
                      <tr>
                        <td colspan="2"
                          ><span>Facemask (Pack 3 & pack 5)</span></td
                        >
                      </tr>
                      <tr>
                        <td colspan="2"><span>Auto Sunshade</span></td>
                      </tr>
                      <tr>
                        <td colspan="2"><span>Round Carpet (size S)</span></td>
                      </tr>
                      <tr>
                        <td colspan="2"><span>Blanket</span></td>
                      </tr>
                      <tr>
                        <td colspan="2"><span>Tất cả các loại giày</span></td>
                      </tr>
                    </table>
                  </div>
                  <div class="col-lg-6">
                    <table
                      class="table table-full-width table-borderless tbl-reward"
                    >
                      <tr>
                        <td colspan="2">
                          <h4 class="head-title">Cơ cấu giải thưởng</h4>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b>Giải đặc biệt:</b><br />
                          <span>400,000 Point </span>
                        </td>
                        <td>
                          <b>1 Căn hộ 3 phòng ngủ Vinhomes Ocean Park </b><br />
                          <span>150,000$</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b>Giải nhất:</b><br />
                          <span>200,000 Point</span>
                        </td>
                        <td>
                          <b>1 Mercedes C300 AMG 2020</b><br />
                          <span>80,000$</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b>Giải nhì:</b><br />
                          <span> 150,000 Point </span>
                        </td>
                        <td>
                          <b>1 Vinfast Lux A 2.0 Plus</b><br />
                          <span>55,000$</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b>Giải ba:</b><br />
                          <span>100,000 Point </span>
                        </td>
                        <td>
                          <b>1 Mazda 3 Sport Premium 2020</b><br />
                          <span>35,000$</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b>Giải tư:</b><br />
                          <span>50,000 Point </span>
                        </td>
                        <td>
                          <b>1 Đồng hồ Rolex Datejust </b><br />
                          <span>13,000$</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b>Giải năm:</b><br />
                          <span>25,000 Point </span>
                        </td>
                        <td>
                          <b>1 Đồng hồ Hublot Classic Fusion Titanium </b><br />
                          <span>6,000$</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b>Giải sáu:</b><br />
                          <span>15,000 Point </span>
                        </td>
                        <td>
                          <b>1 Macbook Pro</b><br />
                          <span>2,500$</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b>Giải bảy:</b><br />
                          <span>7,500$ Point </span>
                        </td>
                        <td>
                          <b>1 Iphone 12 mới nhất </b><br />
                          <span>1,200$</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b>Giải tám:</b><br />
                          <span>2,500$ Point </span>
                        </td>
                        <td>
                          <b>1 Ghế Massage </b><br />
                          <span>500$</span>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div class="mt-60">
                  <h4 class="head-title"
                    >Tiêu chí ghi nhận điểm và Quy chế tính điểm</h4
                  >
                  <div class="mt-15">
                    <div>
                      <span
                        >Điểm được ghi nhận cho các đơn hàng đạt đủ các tiêu chí
                        như sau:</span
                      >
                      <ul class="mt-10">
                        <li
                          >Các đơn hàng được up lên hệ thống từ 01/10 đến
                          31/12/2020;</li
                        >
                        <li
                          >Điểm sẽ được ghi nhận khi các đơn hàng đã up lên hệ
                          thống, được thanh toán và ghi nhận sang trạng thái
                          <strong>PAID</strong> thành công. Hiện tại theo quy
                          chế cập nhật từ team Support thì các đơn hàng đang
                          được hold thanh toán trong vòng 48h;</li
                        >
                        <li
                          >Trong trường hợp các đơn hàng được up vào ngày
                          31/12/2020, sellers có tối đa hoàn thiện
                          <strong
                            >thanh toán chậm nhất vào 23h59’ ngày
                            02/01/2021</strong
                          >. Sau thời điểm này, hệ thống không ghi nhận points
                          cho các đơn hàng này.</li
                        >
                        <li
                          >Điểm sẽ được cập nhật sau 12h đêm mỗi ngày trên hệ
                          thống.</li
                        >
                      </ul>
                    </div>
                    <div>
                      <span>Quy chế tính điểm với hình thức thi:</span>
                      <ul class="mt-10">
                        <li
                          ><b>Cá nhân:</b> không giới hạn thời gian đăng kí tham
                          gia trong Contest, có thể dừng tham gia Contest bất cứ
                          lúc nào;</li
                        >
                        <li>
                          <b>Đội nhóm:</b> chỉ được đăng ký tham gia trong 10
                          ngày đầu diễn ra Contest, sau ngày 10/10 sẽ khóa chức
                          năng đăng ký. Nếu trong nhóm tham gia có bất cứ sự
                          thay đổi nào về đội hình các thành viên, phải có sự
                          xác nhận của thành viên, team leader và support hỗ trợ
                          team leader đó. Sau khi ghi nhận yêu cầu thay đổi,
                          support báo lại với MKT và hệ thống để lưu lại thông
                          tin thay đổi.
                          <ul class="mt-10">
                            <li
                              >Điểm số của đội nhóm sẽ bị khấu trừ bởi toàn bộ
                              số điểm của thành viên đã rời nhóm (tính từ thời
                              điểm ban đầu cho đến thời điểm thành viên rời
                              nhóm);</li
                            >
                            <li
                              >Thành viên rời nhóm có quyền tiếp tục tham gia
                              dưới hình thức Cá nhân.</li
                            >
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="notice_rule mt-60">
                  <h4 class="head-title">Lưu ý khác</h4>
                  <ul class="list-rule-contest">
                    <li
                      >Một tài khoản chỉ được nhận một giải thưởng duy nhất.
                      Trong trường hợp sellers sử dụng nhiều tài khoản để tham
                      dự contest thì phải đăng ký trước với support và chỉ duy
                      nhất một tài khoản được nhận giải.</li
                    >
                    <li
                      >Người thắng giải có trách nhiệm thanh toán các khoản chi
                      phí phụ thêm khi nhận giải (nếu có). VD: chi phí làm giấy
                      tờ, đăng kiểm, chi phí làm biển số xe, các loại chi phí
                      khác, v.v...</li
                    >
                    <li
                      >Chương trình chỉ áp dụng cho các seller đã thanh toán
                      thành công đơn hàng. Những đơn hàng cancel, refund sẽ
                      không được quy đổi điểm trong contest này.</li
                    >
                    <li>
                      Danh sách sản phẩm và bảng giá:
                      <a
                        href="https://lionnix.com/price"
                        class="font-weight-600"
                      >
                        https://lionnix.com/price</a
                      >
                    </li>
                  </ul>
                  <div class="page_bottom">
                    <img
                      src="@/assets/contest/bottom_logo.png"
                      class="img_bottom"
                    />
                    <div class="desc_content_bottom">
                      <i
                        >Chúc toàn thể Sellers Việt Nam <br />
                        có một mùa sale bội thu gặp nhiều may mắn!</i
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { Carousel, Slide } from 'vue-carousel'
import { VclCode } from 'vue-content-loading'
import { FETCH_POINT } from '@/packages/contest/store'

export default {
  name: 'Contest',
  components: {
    Carousel,
    Slide,
    VclCode,
  },
  data() {
    return {
      images: [
        'jackpots.jpg',
        'first.jpg',
        'second.jpg',
        'third.jpg',
        '4.jpg',
        '5.jpg',
        '6.jpg',
        '7.jpg',
        '8.jpg',
      ],
      prize: [
        {
          start: {
            point: '',
            value: '',
            name: '',
            icon: 'get start.png',
          },
          end: {
            point: 2500,
            value: '500$',
            name: '1 Ghế Massage',
            icon: 'massage2.png',
          },
        },
        {
          start: {
            point: 2500,
            value: '500$',
            name: '1 Ghế Massage',
            icon: 'massage2.png',
          },
          end: {
            point: 6000,
            value: '1200$',
            name: '1 Iphone 12 mới nhất',
            icon: 'ip2.png',
          },
        },
        {
          start: {
            point: 6000,
            value: '1200$',
            name: '1 Iphone 12 mới nhất',
            icon: 'ip2.png',
          },
          end: {
            point: 12000,
            value: '2500$',
            name: '1 macbok pro',
            icon: 'macbook_ico2.png',
          },
        },
        {
          start: {
            point: 12000,
            value: '2500$',
            name: '1 macbok pro',
            icon: 'macbook_ico2.png',
          },
          end: {
            point: 25000,
            value: '6000$',
            name: '1 Hublot Classic Fusion Titanium',
            icon: 'hublot_watch_ico2.png',
          },
        },
        {
          start: {
            point: 25000,
            value: '6000$',
            name: '1 Hublot Classic Fusion Titanium',
            icon: 'hublot_watch_ico2.png',
          },
          end: {
            point: 25000,
            value: '13000$',
            name: '1 Đồng hồ Rolex Datejust',
            icon: 'rolex_watch_ico2.png',
          },
        },
        {
          start: {
            point: 25000,
            value: '13000$',
            name: '1 Đồng hồ Rolex Datejust',
            icon: 'rolex_watch_ico2.png',
          },
          end: {
            point: 100000,
            value: '35000$',
            name: '1 Mazda 3 Sport Premium 2020',
            icon: 'mazda_car_ico.png',
          },
        },
        {
          start: {
            point: 100000,
            value: '35000$',
            name: '1 Mazda 3 Sport Premium 2020',
            icon: 'mazda_car_ico.png',
          },
          end: {
            point: 150000,
            value: '55000$',
            name: '1 Vinfast Lux A 2.0 Plus',
            icon: 'vinfast_car_ico.png',
          },
        },
        {
          start: {
            point: 150000,
            value: '55000$',
            name: '1 Vinfast Lux A 2.0 Plus',
            icon: 'vinfast_car_ico.png',
          },
          end: {
            point: 200000,
            value: '80000$',
            name: '1 Mercedes C300 AMG 2020',
            icon: 'mer_car_ico.png',
          },
        },
        {
          start: {
            point: 200000,
            value: '80000$',
            name: '1 Mercedes C300 AMG 2020',
            icon: 'mer_car_ico.png',
          },
          end: {
            point: 400000,
            value: '150000$',
            name: '1 Căn hộ Vinhomes Ocean Park',
            icon: 'home_ico.png',
            margin_icon: 53,
            margin_text: 28,
          },
        },
      ],
      isLoading: false,
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      currentPoint: (state) => state.contest.user_point,
    }),
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions('contest', [FETCH_POINT]),
    getImgUrl(name) {
      return require(`@assets/contest/${name}`)
    },
    async init() {
      this.isLoading = true
      const result = await this.fetchUserPoint()
      if (!result) {
        this.$toast.open({
          type: 'error',
          message: 'Có lỗi xảy ra. Hãy thử lại sau.',
        })
      }
      this.isLoading = false
    },

    mapActiveSlide(curPoint) {
      let i
      for (i = 0; i < this.prize.length; i++) {
        if (
          this.prize[i].start.point <= curPoint &&
          this.prize[i].end.point > curPoint
        ) {
          return i
        }
      }
    },
  },
}
</script>

<style>
.progress-bar {
  background-color: #001dbe !important;
}
</style>
