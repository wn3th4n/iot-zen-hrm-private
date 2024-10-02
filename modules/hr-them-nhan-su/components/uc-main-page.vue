<template>
    <uc-layout>
        <a-card class="card-title-page" title="Thêm nhân sự">
            <!-- <template #title>
                <a-form layout="vertical">
                    <a-row :gutter="[10]">
                        <a-col class="pt-1"> <b class="me-3"></b></a-col>
                    </a-row>
                </a-form>
            </template> -->
        </a-card>
        <uc-container :width="800">
            <a-card>
                <a-form layout="vertical" :rules="rulesForm" ref="formRef" :model="formData">
                    <a-row :gutter="[10]">
                        <a-col :sm="24" :md="24" class="my-2">
                            <b class="fs-5">Thông tin nhân sự</b>
                        </a-col>
                        <a-col :sm="24" :md="8">
                            <uc-avatar-upload v-model="formData.AnhDaiDien_Url" style="margin-bottom: 8px" />
                        </a-col>
                        <a-col :sm="24" :md="16">
                            <a-row :gutter="[10]">
                                <a-col :sm="24" :md="8">
                                    <a-form-item label="Mã chấm công" name="MaChamCong">
                                        <a-input v-model:value="formData.MaChamCong" />
                                    </a-form-item>
                                </a-col>
                                <a-col :sm="24" :md="8">
                                    <a-form-item label="Họ & tên đệm" name="HoVaTenDem">
                                        <a-input v-model:value="formData.HoVaTenDem" />
                                    </a-form-item>
                                </a-col>
                                <a-col :sm="24" :md="8">
                                    <a-form-item label="Tên" name="TenNhanVien">
                                        <a-input v-model:value="formData.TenNhanVien" />
                                    </a-form-item>
                                </a-col>
                            </a-row>
                        </a-col>

                        <a-col :sm="24" :md="5">
                            <a-form-item label="Giới tính">
                                <a-select placeholder="Chọn" v-model:value="formData.GioiTinh">
                                    <a-select-option :value="1">Nam</a-select-option>
                                    <a-select-option :value="2">Nữ</a-select-option>
                                    <a-select-option :value="3">Khác</a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :sm="24" :md="9">
                            <a-form-item label="Email">
                                <a-input v-model:value="formData.Email" />
                            </a-form-item>
                        </a-col>
                        <a-col :sm="24" :md="5">
                            <a-form-item label="Điện thoại" name="DienThoai">
                                <a-input v-model:value="formData.DienThoai" />
                            </a-form-item>
                        </a-col>
                        <a-col :sm="24" :md="5">
                            <a-form-item label="Ngày sinh" name="DayOfBirth">
                                <a-date-picker v-model:value="formData.DayOfBirth" format="DD/MM/YYYY" class="w-100" placeholder="Chọn ngày" />
                            </a-form-item>
                        </a-col>

                        <a-col :sm="24" :md="5">
                            <a-form-item label="Tình trạng hôn nhân">
                                <a-select placeholder="Chọn" v-model:value="formData.TrangThai_HonNhan">
                                    <a-select-option :value="1">Chưa kết hôn</a-select-option>
                                    <a-select-option :value="2">Đã kết hôn</a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>

                        <a-col :sm="24" :md="11">
                            <a-form-item label="Văn phòng" name="VanPhong_Id">
                                <uc-select-van-phong v-model:value="formData.VanPhong_Id"></uc-select-van-phong>
                            </a-form-item>
                        </a-col>
                        <a-col :sm="24" :md="8">
                            <a-form-item label="Chức danh" name="ChucDanh_Id">
                                <uc-select-chuc-danh v-model:value="formData.ChucDanh_Id" />
                            </a-form-item>
                        </a-col>
                        <a-col :sm="24" :md="6">
                            <a-form-item label="Phân loại nhân sự" name="HinhThuc_Id">
                                <uc-select-hinh-thuc v-model:value="formData.HinhThuc_Id" />
                            </a-form-item>
                        </a-col>
                        <a-col :sm="24" :md="8">
                            <a-form-item label="Vị trí" name="ViTri_Id">
                                <uc-select-vi-tri v-model:value="formData.ViTri_Id" :isMultiple="false" />
                            </a-form-item>
                        </a-col>
                        <a-col :sm="24" :md="5">
                            <a-form-item label="Ngày bắt đầu" name="NgayBatDau">
                                <a-date-picker v-model:value="formData.NgayBatDau" format="DD/MM/YYYY" class="w-100" placeholder="Chọn ngày" />
                            </a-form-item>
                        </a-col>
                        <a-col :sm="24" :md="5">
                            <a-form-item label="Ngày chính thức" name="NgayChinhThuc">
                                <a-date-picker v-model:value="formData.NgayChinhThuc" format="DD/MM/YYYY" class="w-100" placeholder="Chọn ngày" />
                            </a-form-item>
                        </a-col>
                        <a-col :sm="24" :md="8">
                            <a-form-item label="Nhóm nhân sự" name="NhomNhanVien_Id">
                                <uc-select-nhom-nhan-vien v-model:value="formData.NhomNhanVien_Id" />
                            </a-form-item>
                        </a-col>
                        <a-col :sm="24" :md="24" class="my-2">
                            <b class="fs-5">Thông tin lương</b>
                        </a-col>
                        <a-col :sm="24" :md="12">
                            <a-form-item label="Lịch làm việc" name="MauBangCong_Id">
                                <uc-select-mau-bang-cong v-model:value="formData.MauBangCong_Id" />
                            </a-form-item>
                        </a-col>
                        <a-col :sm="24" :md="12">
                            <a-form-item label="Chính sách lương" name="MauBangLuong_Id">
                                <uc-select-mau-bang-luong v-model:value="formData.MauBangLuong_Id" />
                            </a-form-item>
                        </a-col>
                        <a-col :sm="24" :md="8">
                            <a-form-item label="Bậc lương" name="BacLuong_Id">
                                <uc-select-bac-luong v-model:value="formData.BacLuong_Id" />
                            </a-form-item>
                        </a-col>
                        <a-col :sm="24" :md="8">
                            <a-form-item label="Bậc thưởng" name="BacThuong_Id">
                                <uc-select-bac-thuong v-model:value="formData.BacThuong_Id" />
                            </a-form-item>
                        </a-col>
                        <a-col :sm="24" :md="8">
                            <a-form-item label="Nhóm ca mẫu " name="NhomCaMau_Id">
                                <uc-select-nhom-ca-mau v-model:value="formData.NhomCaMau_Id" />
                            </a-form-item>
                        </a-col>

                        <a-col :sm="24" :md="12">
                            <a-form-item label="Lương cơ bản" name="LuongCoBan">
                                <a-input-number v-model:value="formData.LuongCoBan" :formatter="formatter" :parser="parser" class="w-100" />
                            </a-form-item>
                        </a-col>
                        <a-col :sm="24" :md="24" class="my-2">
                            <b class="fs-5">Thông tin liên lạc</b>
                        </a-col>
                        <a-col :sm="24" :md="24">
                            <a-form-item label="Địa chỉ">
                                <a-input v-model:value="formData.DiaChi_TamTru" />
                            </a-form-item>
                        </a-col>
                        <a-col :sm="24" :md="24">
                            <a-form-item label="Hộ khẩu thường trú">
                                <a-input v-model:value="formData.DiaChi_ThuongTru" />
                            </a-form-item>
                        </a-col>
                        <a-col :sm="24" :md="8">
                            <a-form-item label="Nơi sinh">
                                <a-input v-model:value="formData.NoiSinh" />
                            </a-form-item>
                        </a-col>
                        <a-col :sm="24" :md="8">
                            <a-form-item label="Quốc tịch">
                                <a-input v-model:value="formData.QuocTich" />
                            </a-form-item>
                        </a-col>
                        <a-col :sm="24" :md="8">
                            <a-form-item label="Biệt danh">
                                <a-input v-model:value="formData.BietDanh" />
                            </a-form-item>
                        </a-col>

                        <a-col :sm="24" :md="8">
                            <a-form-item label="CMT/Căn cước" name="So_CCCD">
                                <a-input v-model:value="formData.So_CCCD" />
                            </a-form-item>
                        </a-col>
                        <a-col :sm="24" :md="8">
                            <a-form-item label="Ngày cấp" name="NgayCap_CCCD">
                                <a-date-picker v-model:value="formData.NgayCap_CCCD" format="DD/MM/YYYY" class="w-100" placeholder="Chọn ngày" />
                            </a-form-item>
                        </a-col>
                        <a-col :sm="24" :md="8">
                            <a-form-item label="Nơi cấp" name="NoiCap_CCCD">
                                <a-input v-model:value="formData.NoiCap_CCCD" />
                            </a-form-item>
                        </a-col>

                        <a-col :sm="24" :md="8">
                            <a-form-item label="Email khác">
                                <a-input v-model:value="formData.Email_Khac" />
                            </a-form-item>
                        </a-col>
                        <a-col :sm="24" :md="8">
                            <a-form-item label="Số điện thoại khác">
                                <a-input v-model:value="formData.DienThoai_Khac" />
                            </a-form-item>
                        </a-col>
                        <a-col :sm="24" :md="8">
                            <a-form-item label="Hết hạn thông tin cá nhân" name="NgayHetHan">
                                <a-date-picker placeholder="Chọn ngày" format="DD/MM/YYYY" v-model:value="formData.NgayHetHan" class="w-100" />
                            </a-form-item>
                        </a-col>

                        <a-col :sm="24" :md="8">
                            <a-form-item label="LinkedIn">
                                <a-input v-model:value="formData.LinkedIn" />
                            </a-form-item>
                        </a-col>
                        <a-col :sm="24" :md="8">
                            <a-form-item label="Facebook">
                                <a-input v-model:value="formData.Facebook" />
                            </a-form-item>
                        </a-col>
                        <a-col :sm="24" :md="8">
                            <a-form-item label="Website">
                                <a-input v-model:value="formData.Website" />
                            </a-form-item>
                        </a-col>

                        <a-col :sm="24" :md="24" class="my-2">
                            <b class="fs-5">Thông tin ngân hàng</b>
                        </a-col>
                        <a-col :sm="24" :md="12">
                            <a-form-item label="Số tài khoản ngân hàng">
                                <a-input v-model:value="formData.SoTaiKhoan_NganHang" />
                            </a-form-item>
                        </a-col>
                        <a-col :sm="24" :md="12">
                            <a-form-item label="Tên chủ tài khoản">
                                <a-input v-model:value="formData.TenTaiKhoan_NganHang" />
                            </a-form-item>
                        </a-col>
                        <a-col :sm="24" :md="12">
                            <a-form-item label="Tên ngân hàng">
                                <a-input v-model:value="formData.Ten_NganHang" />
                            </a-form-item>
                        </a-col>
                        <a-col :sm="24" :md="12">
                            <a-form-item label="Chi nhánh ngân hàng">
                                <a-input v-model:value="formData.ChiNhanh_NganHang" />
                            </a-form-item>
                        </a-col>

                        <a-col :sm="24" :md="24" class="my-2">
                            <b class="fs-5">Hồ sơ xin việc</b>
                        </a-col>
                        <a-col :sm="24" :md="24">
                            <uc-file-upload v-model:modelValue="fileList" :multiple="true" title="Upload hồ sơ" accept=".pdf, .docx, .doc, .docs"></uc-file-upload>
                        </a-col>
                        <a-col :sm="24" :md="24" class="mt-4">
                            <b class="fs-5">Các thông tin khác</b>
                            <br />
                            <span class="mt-4">Các trường dữ liệu tùy chỉnh của nhân sự</span>
                            <br />
                            <a-divider class="mt-3 mb-3" />
                        </a-col>

                        <a-col :sm="24" :md="24" class="mb-3"> <a-switch v-model:checked="switch_TTPL" class="me-2" /> <b>Nhập thông tin pháp lý </b></a-col>
                        <a-col :sm="24" :md="12" v-if="switch_TTPL">
                            <a-form-item label="Số sổ BHXH">
                                <a-input v-model:value="formData.So_BHXH" />
                            </a-form-item>
                        </a-col>
                        <a-col :sm="24" :md="12" v-if="switch_TTPL">
                            <a-form-item label="Nơi đăng ký BHXH">
                                <a-input v-model:value="formData.NoiDangKy_BHXH" />
                            </a-form-item>
                        </a-col>
                        <a-col :sm="24" :md="12" v-if="switch_TTPL">
                            <a-form-item label="Mã số thuế">
                                <a-input v-model:value="formData.MaSoThue" />
                            </a-form-item>
                        </a-col>
                        <a-col :sm="24" :md="12" v-if="switch_TTPL">
                            <a-form-item label="Giảm trừ thuế thu nhập cá nhân">
                                <a-select v-model:value="formData.Is_GiamTruThue">
                                    <a-select-option :value="0">Không</a-select-option>
                                    <a-select-option :value="1">Có</a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :sm="24" :md="24" class="mb-3"> <a-switch v-model:checked="switch_TTHV" class="me-2" /> <b>Nhập thông tin học vấn </b></a-col>
                        <a-col :sm="24" :md="24" v-if="switch_TTHV" class="mb-3">
                            <a-table :data-source="dataTTHV" :columns="headersTTHV" size="small" :pagination="false">
                                <template #bodyCell="{ column, record }">
                                    <template v-if="column.key === 'Is_BangCapCaoNhat'">
                                        <uc-icon v-if="record.Is_BangCapCaoNhat" name="check" class="text-success" />
                                    </template>
                                </template>
                            </a-table>

                            <div class="mt-2">
                                <a-button type="link" class="ps-0" @click="onOpenModalTTHV"><uc-icon name="plus" /> Thêm thông tin học vấn</a-button>
                            </div>
                            <uc-form-modal v-model:isOpen="isShowModalThongTinHocVan" title="Thêm thông tin học vấn" :width="600" :formData="formDataTTHV" ref="modalRefTTHV" :rules="rulesTTHV" @onSubmit="onSubmitTTHV()" @onClose="handleCancelTTHV()">
                                <a-row :gutter="[10]">
                                    <a-col :sm="24" :md="12" v-if="switch_TTHV">
                                        <a-form-item label="Trường học" name="TruongHoc">
                                            <a-input v-model:value="formDataTTHV.TruongHoc" />
                                        </a-form-item>
                                    </a-col>
                                    <a-col :sm="24" :md="12" v-if="switch_TTHV">
                                        <a-form-item label="Địa điểm - thành phố" name="ThanhPho">
                                            <a-input v-model:value="formDataTTHV.ThanhPho" />
                                        </a-form-item>
                                    </a-col>
                                    <a-col :sm="24" :md="12" v-if="switch_TTHV">
                                        <a-form-item label="Khoảng thời gian" name="KhoanThoiGian">
                                            <a-input v-model:value="formDataTTHV.KhoanThoiGian" />
                                        </a-form-item>
                                    </a-col>
                                    <a-col :sm="24" :md="12" v-if="switch_TTHV">
                                        <a-form-item label="Bằng cấp" name="BangCap">
                                            <a-input v-model:value="formDataTTHV.BangCap" />
                                        </a-form-item>
                                    </a-col>
                                    <a-col :sm="24" :md="24" v-if="switch_TTHV" class="mb-3">
                                        <a-form-item name="Is_BangCapCaoNhat"> <a-checkbox v-model:checked="formDataTTHV.Is_BangCapCaoNhat"> Đó là bằng cấp cao nhất? </a-checkbox></a-form-item>
                                    </a-col>
                                </a-row>
                            </uc-form-modal>
                        </a-col>
                        <a-col :sm="24" :md="24" class="mb-3"> <a-switch v-model:checked="switch_LSLamViec" class="me-2" /> <b>Nhập lịch sử làm việc </b></a-col>
                        <a-col :sm="24" :md="24" v-if="switch_LSLamViec" class="mb-3">
                            <a-table :data-source="dataLSLV" :columns="headersLSLV" size="small" :pagination="false">
                                <template #bodyCell="{ column, record }"> </template>
                            </a-table>
                            <div class="mt-2">
                                <a-button type="link" class="ps-0" @click="onOpenModalLSLV"><uc-icon name="plus" /> Thêm lịch sử làm việc</a-button>
                            </div>
                            <uc-form-modal v-model:isOpen="isShowModalLichSuLamViec" title="Thêm lịch sử làm việc" :width="600" :formData="formDataLSLV" ref="modalRefLSLV" :rules="rulesLSLV" @onSubmit="onSubmitLSLV()" @onClose="handleCancelLSLV()">
                                <a-row :gutter="[10]">
                                    <a-col :sm="24" :md="12">
                                        <a-form-item label="Công ty" name="CongTy">
                                            <a-input v-model:value="formDataLSLV.CongTy" />
                                        </a-form-item>
                                    </a-col>
                                    <a-col :sm="24" :md="12">
                                        <a-form-item label="Chức danh" name="ChucDanh">
                                            <a-input v-model:value="formDataLSLV.ChucDanh" />
                                        </a-form-item>
                                    </a-col>
                                    <a-col :sm="24" :md="12">
                                        <a-form-item label="Khoảng thời gian">
                                            <a-input v-model:value="formDataLSLV.KhoanThoiGian" />
                                        </a-form-item>
                                    </a-col>
                                    <a-col :sm="24" :md="12">
                                        <a-form-item label="Địa chỉ">
                                            <a-input v-model:value="formDataLSLV.DiaChi" />
                                        </a-form-item>
                                    </a-col>
                                    <a-col :sm="24" :md="24">
                                        <a-form-item label="Nhiệm vụ công việc">
                                            <a-input v-model:value="formDataLSLV.NhiemVuCongViec" />
                                        </a-form-item>
                                    </a-col>
                                </a-row>
                            </uc-form-modal>
                        </a-col>

                        <a-col :sm="24" :md="24" class="mb-3"> <a-switch v-model:checked="switch_TTNguoiThan" class="me-2" /><b>Nhập thông tin gia đình, người phụ thuộc và liên hệ khác </b></a-col>

                        <a-col :sm="24" :md="24" v-if="switch_TTNguoiThan" class="mb-3">
                            <a-table :data-source="dataTTNT" :columns="headersTTNT" size="small" :pagination="false">
                                <template #bodyCell="{ column, record }"> </template>
                            </a-table>
                            <div class="mt-2">
                                <a-button type="link" class="ps-0" @click="onOpenModalTTNT"><uc-icon name="plus" /> Thêm thông tin gia đình, người phụ thuộc và liên hệ khác</a-button>
                            </div>
                            <uc-form-modal v-model:isOpen="isShowModalThongTinNguoiThan" title="Thêm thông tin người thân" :width="600" :formData="formDataTTNT" ref="modalRefTTNT" :rules="rulesTTNT" @onSubmit="onSubmitTTNT()" @onClose="handleCancelTTNT()">
                                <a-row :gutter="[10]">
                                    <a-col :sm="24" :md="12">
                                        <a-form-item label="Họ và tên" name="TTNT_HoVaTen">
                                            <a-input v-model:value="formDataTTNT.HoVaTen" />
                                        </a-form-item>
                                    </a-col>
                                    <a-col :sm="24" :md="12" name="TTNT_Mqh">
                                        <a-form-item label="Mối quan hệ">
                                            <a-input v-model:value="formDataTTNT.MoiQuanHe" />
                                        </a-form-item>
                                    </a-col>
                                    <a-col :sm="24" :md="12">
                                        <a-form-item label="Số điện thoại">
                                            <a-input v-model:value="formDataTTNT.DienThoai" />
                                        </a-form-item>
                                    </a-col>
                                    <a-col :sm="24" :md="12">
                                        <a-form-item label="Ngày sinh">
                                            <a-date-picker placeholder="Chọn ngày" format="DD/MM/YYYY" v-model:value="formDataTTNT.NgaySinh" class="w-100" />
                                        </a-form-item>
                                    </a-col>
                                    <a-col :sm="24" :md="12">
                                        <a-form-item label="Mã số thuế">
                                            <a-input v-model:value="formDataTTNT.MaSoThue" />
                                        </a-form-item>
                                    </a-col>
                                    <a-col :sm="24" :md="12">
                                        <a-form-item label="Địa chỉ">
                                            <a-input v-model:value="formDataTTNT.DiaChi" />
                                        </a-form-item>
                                    </a-col>
                                    <a-col :sm="24" :md="12" class="mb-3">
                                        <a-checkbox v-model:checked="formDataTTNT.Is_NguoiPhuThuoc">Là người phụ thuộc?</a-checkbox>
                                    </a-col>
                                    <a-col :sm="24" :md="12" class="mb-3">
                                        <a-checkbox v-model:checked="formDataTTNT.Is_LienHeKhanCap">Là người liên hệ khẩn cấp?</a-checkbox>
                                    </a-col>
                                </a-row>
                            </uc-form-modal>
                        </a-col>
                    </a-row>
                </a-form>
                <a-button class="float-end" type="primary" @click="onSubmit()"><uc-icon name="content-save-outline" />Thêm nhân sự</a-button>
            </a-card>
        </uc-container>
    </uc-layout>
</template>

<script>
export default {
    props: [],
    data() {
        return {
            switch_TTL: false,
            switch_TTPL: false,
            switch_TTHV: false,
            switch_LSLamViec: false,
            switch_TTNguoiThan: false,
            fileList: [],
            rulesForm: {
                // NgayHetHan: [{required: true, message: 'Vui Lòng nhập ngày hết hạn' , trigger: 'change'}],
                // So_CCCD:[{required: true, message: 'Vui Lòng nhập số căn cước công dân' , trigger: 'change'}],
                // NoiCap_CCCD:[{required: true, message: 'Vui Lòng nhập nơi cấp' , trigger: 'change'}],
                // NgayCap_CCCD:[{required: true, message: 'Vui Lòng nhập ngày cấp' , trigger: 'change'}],
                DayOfBirth: [{ required: true, message: 'Vui Lòng nhập ngày sinh', trigger: 'change' }],
                DienThoai: [{ required: true, message: 'Vui lòng nhập số điện thoại', trigger: 'change' }],
                ChucDanh_Id: [{ required: true, message: 'Vui lòng chọn chức danh', trigger: 'change' }],
                ViTri_Id: [{ required: true, message: 'Vui lòng chọn vị trí', trigger: 'change' }],
                MaChamCong: [{ required: true, message: 'Vui lòng nhập mã chấm công', trigger: 'change' }],
                HoVaTenDem: [{ required: true, message: 'Vui lòng nhập họ và tên đệm', trigger: 'change' }],
                TenNhanVien: [{ required: true, message: 'Vui lòng nhập tên nhân sự', trigger: 'change' }],
                VanPhong_Id: [{ required: true, message: 'Vui lòng chọn văn phòng', trigger: 'change' }],
                HinhThuc_Id: [{ required: true, message: 'Vui lòng chọn phân loại nhân sự', trigger: 'change' }],
                NgayBatDau: [{ required: true, message: 'Vui lòng chọn ngày bắt đầu', trigger: 'change' }],
                NgayChinhThuc: [{ required: true, message: 'Vui lòng chọn ngày chính thức', trigger: 'change' }],
                NhomNhanVien_Id: [{ required: true, message: 'Vui lòng chọn nhóm nhân sự', trigger: 'change' }],
                MauBangCong_Id: [{ required: true, message: 'Vui lòng chọn lịch làm việc', trigger: 'change' }],
                MauBangLuong_Id: [{ required: true, message: 'Vui lòng chọn chính sách lương', trigger: 'change' }],
                BacLuong_Id: [{ required: true, message: 'Vui lòng chọn bậc lương', trigger: 'change' }],
                BacThuong_Id: [{ required: true, message: 'Vui lòng chọn bậc thưởng', trigger: 'change' }],
                NhomCaMau_Id: [{ required: true, message: 'Vui lòng chọn nhóm ca mẫu', trigger: 'change' }],
                LuongCoBan: [{ required: true, message: 'Vui lòng nhập lương cơ bản', trigger: 'change' }],
            },
            isShowModalThongTinHocVan: false,
            isShowModalLichSuLamViec: false,
            isShowModalThongTinNguoiThan: false,
            rulesTTHV: {
                TruongHoc: [{ required: true, message: 'Vui lòng nhập tên trường học', trigger: 'change' }],
            },
            rulesTTNT: {
                TTNT_HoVaTen: [{ required: true, message: 'Vui lòng nhập nhập tên', trigger: 'change' }],
                TTNT_Mqh: [{ required: true, message: 'Vui lòng nhập mối quan hệ', trigger: 'change' }],
            },
            rulesLSLV: {
                CongTy: [{ required: true, message: 'Vui lòng nhập tên công ty', trigger: 'change' }],
                ChucDanh: [{ required: true, message: 'Vui lòng nhập chức danh', trigger: 'change' }],
            },
            DSPhanLoaiNhanSu: [],
            DSViTri: [],
            DSChinhSachLuong: [],
            DSLichLamViec: [],
            progress: {
                strokeColor: {
                    '0%': '#108ee9',
                    '100%': '#87d068',
                },
                strokeWidth: 3,
                format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
                class: 'test',
            },
            formData: {
                ChucDanh_Id: 2,
                ViTri_Id: null,
                NhomCaMau_Id: 1,
                VanPhong_Id: null,
                HinhThuc_Id: 4,
                MauBangCong_Id: null,
                MauBangLuong_Id: null,
                BacLuong_Id: null,
                BacThuong_Id: null,
                NhomNhanVien_Id: 1,
                AnhDaiDien_Url: '',
                MaChamCong: '',
                MaSoThue: '',
                HoVaTenDem: '',
                TenNhanVien: '',
                BietDanh: '',
                GioiTinh: 1,
                DienThoai: '',
                DienThoai_Khac: '',
                Email: '',
                Email_Khac: '',
                LinkedIn: '',
                Facebook: '',
                Website: '',
                DiaChi_TamTru: '',
                DiaChi_ThuongTru: '',
                NgaySinh: null,
                ThangSinh: null,
                NamSinh: null,
                NoiSinh: '',
                QuocTich: '',
                LuongCoBan: null,
                NgayChinhThuc: '',
                NgayBatDau: '',
                So_CCCD: '',
                NgayCap_CCCD: '',
                NoiCap_CCCD: '',
                So_BHXH: '',
                NoiDangKy_BHXH: '',
                SoTaiKhoan_NganHang: '',
                TenTaiKhoan_NganHang: '',
                Ten_NganHang: '',
                ChiNhanh_NganHang: '',
                TrangThai_HonNhan: 1,
                NgayHetHan: '',
                GhiChu: '',
                Is_GiamTruThue: 0,
                Is_CoNguoiPhuThuoc: false,
                HoSoXinViec_JSON: [],
                ThongTinHocVan_JSON: [],
                LichSuLamViec_JSON: [],
                ThongTinGiaDinh_JSON: [],
                DayOfBirth: '',
            },
            formDataTTHV: {
                TruongHoc: '',
                ThanhPho: '',
                KhoanThoiGian: '',
                BangCap: '',
                Is_BangCapCaoNhat: false,
            },
            formDataTTHV_Default: {
                TruongHoc: '',
                ThanhPho: '',
                KhoanThoiGian: '',
                BangCap: '',
                Is_BangCapCaoNhat: false,
            },
            formDataLSLV: {
                CongTy: '',
                ChucDanh: '',
                KhoanThoiGian: '',
                DiaChi: '',
                NhiemVuCongViec: '',
            },
            formDataLSLV_Default: {
                CongTy: '',
                ChucDanh: '',
                KhoanThoiGian: '',
                DiaChi: '',
                NhiemVuCongViec: '',
            },
            formDataTTNT: {
                HoVaTen: '',
                MoiQuanHe: '',
                DienThoai: '',
                NgaySinh: '',
                CongViec: '',
                MaSoThue: '',
                DiaChi: '',
                Is_NguoiPhuThuoc: false,
                Is_LienHeKhanCap: false,
            },
            formDataTTNT_Default: {
                HoVaTen: '',
                MoiQuanHe: '',
                DienThoai: '',
                NgaySinh: '',
                CongViec: '',
                MaSoThue: '',
                DiaChi: '',
                Is_NguoiPhuThuoc: false,
                Is_LienHeKhanCap: false,
            },
            headersTTHV: [
                { title: 'Trường học', dataIndex: 'TruongHoc' },
                { title: 'Thành phố', dataIndex: 'ThanhPho' },
                { title: 'Khoảng thời gian', dataIndex: 'KhoanThoiGian' },
                { title: 'Bằng cấp', dataIndex: 'BangCap' },
                { title: 'Bằng cấp cao nhất', dataIndex: 'Is_BangCapCaoNhat', key: 'Is_BangCapCaoNhat' },
            ],
            headersLSLV: [
                { title: 'Công ty', dataIndex: 'CongTy' },
                { title: 'Chức danh', dataIndex: 'ChucDanh' },
                { title: 'Khoảng thời gian', dataIndex: 'KhoanThoiGian' },
                { title: 'Địa chỉ', dataIndex: 'DiaChi' },
                { title: 'Nhiệm vụ công việc', dataIndex: 'NhiemVuCongViec' },
            ],
            headersTTNT: [
                { title: 'Họ và tên', dataIndex: 'HoVaTen' },
                { title: 'Mối quan hệ', dataIndex: 'MoiQuanHe' },
                { title: 'Điện thoại', dataIndex: 'DienThoai' },
                { title: 'Địa chỉ', dataIndex: 'DiaChi' },
                { title: 'Ngày sinh', dataIndex: 'NgaySinh' },
            ],
            dataLSLV: [],
            dataTTHV: [],
            dataTTNT: [],
        }
    },
    mounted() {},
    computed: {},
    watch: {},
    methods: {
        async onSubmit() {
            const $this = this
            $this.$refs.formRef
                .validateFields()
                .then(async () => {
                    $this.formData.NgaySinh = $this.formData.DayOfBirth !== '' ? $this.formData.DayOfBirth.date() : null
                    $this.formData.ThangSinh = $this.formData.DayOfBirth !== '' ? $this.formData.DayOfBirth.month() + 1 : null
                    $this.formData.NamSinh = $this.formData.DayOfBirth !== '' ? $this.formData.DayOfBirth.year() : null
                    let fileObj = $this.fileList.map((item) => {
                        return { File_Id: item.uid }
                    })
                    $this.formData.HoSoXinViec_JSON = JSON.stringify(fileObj)
                    $this.formData.ThongTinHocVan_JSON = JSON.stringify(this.dataTTHV)
                    $this.formData.LichSuLamViec_JSON = JSON.stringify(this.dataLSLV)
                    $this.formData.ThongTinGiaDinh_JSON = JSON.stringify(this.dataTTNT)
                    const res = await nhanVienService.NhanVien_Insert({
                        ChucDanh_Id: $this.formData.ChucDanh_Id,
                        ViTri_Id: $this.formData.ViTri_Id,
                        NhomCaMau_Id: $this.formData.NhomCaMau_Id,
                        VanPhong_Id: $this.formData.VanPhong_Id,
                        HinhThuc_Id: $this.formData.HinhThuc_Id,
                        MauBangCong_Id: $this.formData.MauBangCong_Id,
                        MauBangLuong_Id: $this.formData.MauBangLuong_Id,
                        BacLuong_Id: $this.formData.BacLuong_Id,
                        BacThuong_Id: $this.formData.BacThuong_Id,
                        NhomNhanVien_Id: $this.formData.NhomNhanVien_Id,
                        AnhDaiDien_Url: $this.formData.AnhDaiDien_Url,
                        MaChamCong: $this.formData.MaChamCong,
                        MaSoThue: $this.formData.MaSoThue,
                        HoVaTenDem: $this.formData.HoVaTenDem,
                        TenNhanVien: $this.formData.TenNhanVien,
                        BietDanh: $this.formData.BietDanh,
                        GioiTinh: $this.formData.GioiTinh,
                        DienThoai: $this.formData.DienThoai,
                        DienThoai_Khac: $this.formData.DienThoai_Khac,
                        Email: $this.formData.Email,
                        Email_Khac: $this.formData.Email_Khac,
                        LinkedIn: $this.formData.LinkedIn,
                        Facebook: $this.formData.Facebook,
                        Website: $this.formData.Website,
                        DiaChi_TamTru: $this.formData.DiaChi_TamTru,
                        DiaChi_ThuongTru: $this.formData.DiaChi_ThuongTru,
                        NgaySinh: $this.formData.NgaySinh,
                        ThangSinh: $this.formData.ThangSinh,
                        NamSinh: $this.formData.NamSinh,
                        NoiSinh: $this.formData.NoiSinh,
                        QuocTich: $this.formData.QuocTich,
                        LuongCoBan: $this.formData.LuongCoBan,
                        NgayChinhThuc: $this.formData.NgayChinhThuc === '' || $this.formData.NgayChinhThuc === null ? '' : $this.formData.NgayChinhThuc.format('YYYY-MM-DD'),
                        NgayBatDau: $this.formData.NgayBatDau === '' || $this.formData.NgayBatDau === null ? '' : $this.formData.NgayBatDau.format('YYYY-MM-DD'),
                        So_CCCD: $this.formData.So_CCCD,
                        NgayCap_CCCD: $this.formData.NgayCap_CCCD === '' || $this.formData.NgayCap_CCCD === null ? '' : $this.formData.NgayCap_CCCD.format('YYYY-MM-DD'),
                        NoiCap_CCCD: $this.formData.NoiCap_CCCD,
                        So_BHXH: $this.formData.So_BHXH,
                        NoiDangKy_BHXH: $this.formData.NoiDangKy_BHXH,
                        SoTaiKhoan_NganHang: $this.formData.SoTaiKhoan_NganHang,
                        TenTaiKhoan_NganHang: $this.formData.TenTaiKhoan_NganHang,
                        Ten_NganHang: $this.formData.Ten_NganHang,
                        ChiNhanh_NganHang: $this.formData.ChiNhanh_NganHang,
                        TrangThai_HonNhan: $this.formData.TrangThai_HonNhan,
                        NgayHetHan: $this.formData.NgayHetHan === '' || $this.formData.NgayHetHan === null ? '' : $this.formData.NgayHetHan.format('YYYY-MM-DD'),
                        GhiChu: $this.formData.GhiChu,
                        Is_GiamTruThue: $this.formData.Is_GiamTruThue,
                        Is_CoNguoiPhuThuoc: $this.formData.Is_CoNguoiPhuThuoc,
                        HoSoXinViec_JSON: $this.formData.HoSoXinViec_JSON,
                        ThongTinHocVan_JSON: $this.formData.ThongTinHocVan_JSON,
                        LichSuLamViec_JSON: $this.formData.LichSuLamViec_JSON,
                        ThongTinGiaDinh_JSON: $this.formData.ThongTinGiaDinh_JSON,
                    })
                    if (res) {
                        $this.$message.success('Thêm thành công!')
                    }
                })
                .catch((err) => {
                    $this.$message.error('Thêm nhân sự thất bại')
                    console.log(err)
                })
        },
        onOpenModalTTHV(event) {
            this.isShowModalThongTinHocVan = true
        },
        onSubmitTTHV() {
            this.isShowModalThongTinHocVan = false
            this.dataTTHV.push(this.formDataTTHV)
            this.formDataTTHV = Object.assign({}, this.formDataTTHV_Default)
            this.$message.success(`Thêm thông tin học vấn thành công`)
        },
        handleCancelTTHV() {
            this.isShowModalThongTinHocVan = false
        },

        onOpenModalLSLV(event) {
            this.isShowModalLichSuLamViec = true
        },
        onSubmitLSLV() {
            this.isShowModalLichSuLamViec = false
            this.dataLSLV.push(this.formDataLSLV)
            this.formDataLSLV = Object.assign({}, this.formDataLSLV_Default)
            this.$message.success(`Thêm lịch sử làm việc thành công`)
        },
        handleCancelLSLV() {
            this.isShowModalLichSuLamViec = false
        },
        onOpenModalTTNT(event) {
            this.isShowModalThongTinNguoiThan = true
        },
        onSubmitTTNT() {
            this.isShowModalThongTinNguoiThan = false
            this.formDataTTNT.NgaySinh = this.formDataTTNT.NgaySinh.format('DD/MM/YYYY')
            this.dataTTNT.push(this.formDataTTNT)
            this.formDataTTNT = Object.assign({}, this.formDataTTNT_Default)
            this.$message.success(`Thêm lịch sử làm việc thành công`)
        },
        handleCancelTTNT() {
            this.isShowModalThongTinNguoiThan = false
        },
        formatter(value) {
            return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        },

        parser(value) {
            return value.replace(/\$\s?|(,*)/g, '')
        },
    },
}
</script>
