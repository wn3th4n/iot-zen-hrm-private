const ajaxZEN = (url, param = null, callBack) => {
    return new Promise((resolve, reject) => {
        const $this = this
        $.ajax({
            type: 'POST',
            headers: {
                authorization: $awt,
            },
            url: fixURL(url),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            crossDomain: true,
            data: JSON.stringify(param),
            success: function (d) {
                json_data_parse(d, 0)
                if (callBack) callBack(d)
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log('API:', url, 'IN:', param)
                console.log('Error XHR:', xhr)
                const { notification } = $this.antd
                const errorText = xhr.responseJSON.Message
                notification.error({ message: 'Thông báo', description: errorText })
                reject(errorText)
            },
        })
    })
}

const apiUtilWork = {
    HR: (url, param = null) => {
        return new Promise((resolve, reject) => {
            ajaxZEN('/work/HR_' + url, param, (res) => {
                resolve(res)
            })
        })
    },
    WK: (url, param = null) => {
        return new Promise((resolve, reject) => {
            ajaxZEN('/work/WK_' + url, param, (res) => {
                resolve(res)
            })
        })
    },
    CA: (url, param = null) => {
        return new Promise((resolve, reject) => {
            ajaxZEN('/work/CA_' + url, param, (res) => {
                resolve(res)
            })
        })
    },
    PA: (url, param = null) => {
        return new Promise((resolve, reject) => {
            ajaxZEN('/work/PA_' + url, param, (res) => {
                resolve(res)
            })
        })
    },
    CT: (url, param = null) => {
        return new Promise((resolve, reject) => {
            ajaxZEN('/work/CT_' + url, param, (res) => {
                resolve(res)
            })
        })
    },
    IO: (url, param = null) => {
        return new Promise((resolve, reject) => {
            ajaxZEN('/work/IO_' + url, param, (res) => {
                resolve(res)
            })
        })
    },
    OT: (url, param = null) => {
        return new Promise((resolve, reject) => {
            ajaxZEN('/work/OT_' + url, param, (res) => {
                resolve(res)
            })
        })
    },
    AC: (url, param = null) => {
        return new Promise((resolve, reject) => {
            ajaxZEN('/work/AC_' + url, param, (res) => {
                resolve(res)
            })
        })
    },
}

// const nhanVienService = {
//     NhanVien_Select: async (formFilter) => {
//         const { TimKiem, TrangThai_LamViec, PageIndex, PageSize } = formFilter
//         const res = await apiUtilWork.HR('NhanVien_Select', {
//             TimKiem: TimKiem,
//             TrangThai_LamViec: TrangThai_LamViec,
//             PageIndex: PageIndex,
//             PageSize: PageSize,
//         })
//         if (res.data) {
//             const Pagination = res.data[0][0]
//             const DSNhanVien = res.data[1]
//             return { Pagination, DSNhanVien }
//         }
//     },
//     NhanVien_Select_Search: async (params) => {
//         const res = await apiUtilWork.HR('NhanVien_Select_Search', params)
//         if (res.data) {
//             return res.data
//         }
//     },
//     NhanVien_Select_By_Id: async (params) => {
//         // @NhanVien_Id INT
//         const res = await apiUtilWork.HR('NhanVien_Select_By_Id', params)
//         if (res.data) {
//             const ThongTinNhanSu = res.data[0][0]
//             const ThongTinHoSo = res.data[1]
//             const ThongTinHocVan = res.data[2]
//             const ThongTinLichSuLamViec = res.data[3]
//             const ThongTinGiaDinhNguoiPhuThuoc = res.data[4]
//             return {
//                 ThongTinNhanSu,
//                 ThongTinHoSo,
//                 ThongTinHocVan,
//                 ThongTinLichSuLamViec,
//                 ThongTinGiaDinhNguoiPhuThuoc
//             }
//         }
//     }
// }

const vanPhongService = {
    VanPhong_Select: async () => {
        const res = await apiUtilWork.HR('VanPhong_Select')
        if (res.data) {
            return res.data
        }
    },
}

const lichLamViecService = {
    LichLamViec_Select: async () => {
        const res = await apiUtilWork.CA('LichLamViec_Select')
        if (res.data) {
            const DSChuKy = res.data[0]
            const DSMauBangCong = res.data[1]
            return { DSChuKy, DSMauBangCong }
        }
    },
    LichLamViec_Insert: async (params) => {
        // @Thang INT,
        // @Nam INT
        const res = await apiUtilWork.CA('LichLamViec_Insert', params)
        if (res.data) {
            return true
        } else {
            return false
        }
    },
    LichLamViec_Delete: async (params) => {
        //	@LichLamViec_Id INT
        const res = await apiUtilWork.CA('LichLamViec_Delete', params)
        if (res.data) {
            return true
        } else {
            return false
        }
    },
    LichLamViec_MauBangCong_Select: async (params) => {
        //@LichLamViec_Id INT
        const res = await apiUtilWork.CA('LichLamViec_MauBangCong_Select', params)
        if (res.data) {
            return true
        } else {
            return false
        }
    },
    LichLamViec_MauBangCong_Insert: async (params) => {
        // @LichLamViec_Id INT,
        // @MauBangCong_Id INT
        const res = await apiUtilWork.CA('LichLamViec_MauBangCong_Insert', params)
        if (res.data) {
            return true
        } else {
            return false
        }
    },
    LichLamViec_MauBangCong_Delete: async (params) => {
        //@LichLamViec_MauBangCong_Id INT
        const res = await apiUtilWork.CA('LichLamViec_MauBangCong_Delete', params)
        if (res.data) {
            return true
        } else {
            return false
        }
    },
    LichLamViec_PhanCa_Clone: async (params) => {
        // @LichLamViec_Id_Clone INT
        // @LichLamViec_Id INT
        // @MauBangCong_Id INT
        // @Is_TatCaNgay BIT
        // @TuNgay varchar(10)
        // @DenNgay varchar(10)
        const res = await apiUtilWork.CA('LichLamViec_PhanCa_Clone', params)
        if (res.data) {
            return true
        } else {
            return false
        }
    },
    LichLamViec_PhanCa_HangLoat: async (params) => {
        // @TuNgay DATE,
        // @DenNgay DATE,
        // @Thu_List NVARCHAR(50), -- '2,3,4'
        // @Is_TatCaNhanVien BIT,
        // @NhanVien_Id_List NVARCHAR(MAX),
        // @Is_GhiDe BIT,
        // -----------------------
        // @LichLamViec_Id INT,
        // @MauBangCong_Id INT,
        // @Ngay INT,
        // @CaMau_Id INT,
        // @LoaiCa_Id INT,
        // @NhanVien_Id INT,
        // @VanPhong_Id INT,
        // @MaLoaiViTri_List VARCHAR(500),
        // @GioBatDau TIME,
        // @GioKetThuc TIME,
        // @SoPhutNghi INT, 
        // @SoCongChuan NUMERIC(18, 2),
        // @GhiChu NVARCHAR(500),
        // @BatDauCa_Som_Phut INT,
        // @BatDauCa_Tre_Phut INT,
        // @KetThucCa_Som_Phut INT,
        // @KetThucCa_Tre_Phut INT,
        // @Is_CaQuaDem BIT,
        // @Is_DaoTao BIT,
        // @Is_XuatBan BIT
        const res = await apiUtilWork.CA('LichLamViec_PhanCa_HangLoat', params)
        if (res.data) {
            return true
        } else {
            return false
        }
    },
    LichLamViec_PhanCa_Import: async (params) => {
        // @LichLamViec_Id INT,
        // @MauBangCong_Id INT,
        // @LichLamViec_PhanCa_JSON NVARCHAR(MAX)
        // Cấu trúc @LichLamViec_PhanCa_JSON
        // NhanVien_Id INT,
        // Ngay INT,
        // MaCaMau NVARCHAR(50), // Lịch làm việc "02-09"
        // MaLoaiViTri_List NVARCHAR(500), // Loại vị trí / vai trò
        // Is_DaoTao BIT  // Đào tạo If V = true else false
        const res = await apiUtilWork.CA('LichLamViec_PhanCa_Import', params)
        if (res.data) {
            return true
        } else {
            return false
        }
    },
    LichLamViec_PhanCa_Select_Template: async (params) => {
        // @LichLamViec_Id INT,
        // @MauBangCong_Id INT,
        const res = await apiUtilWork.CA('LichLamViec_PhanCa_Select_Template', params)
        if (res.data) {
            const DSNgay = res.data[0]
            const DSCaCan = res.data[1]
            const DSCaCo = res.data[2]
            const DSCaMau = res.data[3]
            const CTNhanSuDuBao = res.data[4][0]
            const CTNhanSuOff = res.data[5][0]
            const DSNhanVien = res.data[6]
            return { DSNgay, DSCaCan, DSCaCo, DSCaMau, CTNhanSuDuBao, CTNhanSuOff, DSNhanVien }
        }
    },
    LichLamViec_PhanCa_Select: async (params) => {
        // @LichLamViec_Id INT,
        // @MauBangCong_Id INT,
        // @NhomCaMau_Id INT
        const res = await apiUtilWork.CA('LichLamViec_PhanCa_Select', params)
        if (res.data) {
            const DSNgay = res.data[0]
            const DSNhanVien = res.data[1]
            const CTBangCong = res.data[2][0]
            const CTLichLamViec = res.data[3][0]
            return { DSNgay, DSNhanVien, CTBangCong, CTLichLamViec }
        }
    },
    LichLamViec_PhanCa_Update: async (params) => {
        // @LichLamViec_PhanCa_Id INT,
        // @CaMau_Id INT,
        // @LoaiCa_Id INT,
        // @GhiChu NVARCHAR(500),
        // @Is_DaoTao BIT,
        // @Is_LichOff BIT
        const res = await apiUtilWork.CA('LichLamViec_PhanCa_Update', params)
        if (res.data) {
            return true
        } else {
            return false
        }
    },
    LichLamViec_PhanCa_Delete: async (params) => {
        //@LichLamViec_PhanCa_Id INT
        const res = await apiUtilWork.CA('LichLamViec_PhanCa_Delete', params)
        if (res.data) {
            return true
        } else {
            return false
        }
    },
    LichLamViec_PhanCa_Delete_By_MauBangCong_Id: async (params) => {
        //@LichLamViec_Id INT
        //@MauBangCong_Id INT
        const res = await apiUtilWork.CA('LichLamViec_PhanCa_Delete_By_MauBangCong_Id', params)
        if (res.data) {
            return true
        } else {
            return false
        }
    },
    LichLamViec_PhanCa_Select_Lich: async (params) => {
        // @LichLamViec_Id INT,
        // @MauBangCong_Id INT,
        const res = await apiUtilWork.CA('LichLamViec_PhanCa_Select_Lich', params)
        if (res.data) {
            const DSNgay = res.data[0]
            const DSPhanCa = res.data[1]
            const DSNhanVien = res.data[2]
            const CTBangCong = res.data[3][0]
            const CTLichLamViec = res.data[4][0]
            return { DSNgay, DSPhanCa, DSNhanVien, CTBangCong, CTLichLamViec }
        }
    },
    LichLamViec_TinhCong_Select_Ngay_By_NhanVien_Id: async (params) => {
        // @LichLamViec_PhanCa_Id INT
        const res = await apiUtilWork.CA('LichLamViec_TinhCong_Select_Ngay_By_NhanVien_Id', params)
        if (res.data) {
            return res.data
        }
    },
    LichLamViec_MauBangCong_Update_Status: async (params) => {
        // @LichLamViec_Id INT,
        // @MauBangCong_Id INT,
        //@TrangThai
        const res = await apiUtilWork.CA('LichLamViec_MauBangCong_Update_Status', params)
        if (res.data) {
            return res.data
        }
    },

    LichLamViec_TinhCong_Select_Formula_By_NhanVien_Id: async (params) => {
        // @LichLamViec_Id INT,
        // @MauBangCong_Id INT,
        //@NhanVien_Id INT
        const res = await apiUtilWork.CA('LichLamViec_TinhCong_Select_Formula_By_NhanVien_Id', params)
        if (res.data) {
            const DS_DuLieuCong = res.data[0]
            const DS_CongThucCong = res.data[1]
            return { DS_DuLieuCong, DS_CongThucCong }
        }
    },

    LichLamViec_TinhCong_Select_CongThuc: async (params) => {
        // @LichLamViec_Id INT,
        // @MauBangCong_Id INT,
        const res = await apiUtilWork.CA('LichLamViec_TinhCong_Select_CongThuc', params)
        if (res.data) {
            const DS_BienHeThong = res.data[0]
            const DS_CongThucCong_CongThuc = res.data[1]
            return { DS_BienHeThong, DS_CongThucCong_CongThuc }
        }
    },

    LichLamViec_TinhCong_Apply_Formula_By_NhanVien_Id: async (params) => {
        // @LichLamViec_Id INT,
        // @MauBangCong_Id INT,
        //@LichLamViec_TinhCong_JSON
        const res = await apiUtilWork.CA('LichLamViec_TinhCong_Apply_Formula_By_NhanVien_Id', params)
        if (res) {
            return res.data
        } else {
            return []
        }
    },
    LichLamViec_TinhCong_ChotCong: async (params) => {
        // @LichLamViec_Id INT,
        // @MauBangCong_Id INT,
        // @Is_TatCaNgay BIT,
        // @TuNgay varchar(10),
        // @DenNgay varchar(10),
        const res = await apiUtilWork.CA('LichLamViec_TinhCong_ChotCong', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
    LichLamViec_TinhCong_HuyChotCong: async (params) => {
        // @LichLamViec_Id INT,
        // @MauBangCong_Id INT,
        // @Is_TatCaNgay BIT,
        // @TuNgay varchar(10),
        // @DenNgay varchar(10),
        const res = await apiUtilWork.CA('LichLamViec_TinhCong_HuyChotCong', params)
        if (res) {
            return true
        } else {
            return false
        }
    },

    LichLamViec_TinhCong_DongBoDuLieu: async (params) => {
        // @LichLamViec_Id INT,
        // @MauBangCong_Id INT,
        // @Is_DongBo_NhanSu BIT,
        // @Is_DongBo_Ca BIT,
        // @Is_DongBo_CongThuc BIT,
        // @Is_DongBo_ChamCong BIT,
        const res = await apiUtilWork.CA('LichLamViec_TinhCong_DongBoDuLieu', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
    LichLamViec_TinhCong_Update: async (params) => {
        // @LichLamViec_PhanCa_Id INT,
        // @LichLamViec_TinhCong_JSON NVARCHAR(MAX)
        const res = await apiUtilWork.CA('LichLamViec_TinhCong_Update', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
    LichLamViec_CoDinh_Select_Lich: async (params) => {
        // @LichLamViec_Id INT,
        // @MauBangCong_Id INT,
        const res = await apiUtilWork.CA('LichLamViec_CoDinh_Select_Lich', params)
        const DSNgay = res.data[0]
        const DSPhanCa = res.data[1]
        const TTMauBangCong = res.data[2][0]
        const TTChuKy = res.data[3][0]
        return { DSNgay, DSPhanCa, TTMauBangCong, TTChuKy }
    },

}

const lichDuTruService = {
    LichDuTru_Select: async (params) => {
        // @LichLamViec_Id INT,
        // @MauBangCong_Id  INT,
        const res = await apiUtilWork.CA('LichDuTru_Select', params)
        if (res.data) {
            const DSNgay = res.data[0] ?? []
            const DSLichCaMau = res.data[1] ?? []
            const CTBangCong = res.data[2][0]
            const CTLichLamViec = res.data[3][0]
            return { DSNgay, DSLichCaMau, CTBangCong, CTLichLamViec }
        }
    },
    LichDuTru_Select_Template: async (params) => {
        // @LichLamViec_Id INT,
        // @MauBangCong_Id  INT,
        // @Is_CoViTri BIT
        const res = await apiUtilWork.CA('LichDuTru_Select_Template', params)
        if (res.data) {
            const DSNgay = res.data[0] ?? []
            const DSLichCaMau = res.data[1] ?? []
            return { DSNgay, DSLichCaMau }
        }
    },
    LichDuTru_Insert: async (params) => {
        // @LichLamViec_Id INT,
        // @MauBangCong_Id  INT,
        // @LichLamViec_JSON NVARCHAR(MAX)
        // CaMau_Id INT,
        // ViTri_Id INT,
        // Ngay_01 INT, ...

        const res = await apiUtilWork.CA('LichDuTru_Insert', params)
        if (res.data) {
            return true
        } else {
            return false
        }
    },
    LichDuTru_Delete: async (params) => {
        // @LichLamViec_Id INT,
        // @MauBangCong_Id  INT
        const res = await apiUtilWork.CA('LichDuTru_Delete', params)
        if (res.data) {
            return true
        } else {
            return false
        }
    },
}

const lichOffService = {
    LichOff_Select_Template: async (params) => {
        //@LichLamViec_Id INT,
        //@MauBangCong_Id  INT
        const res = await apiUtilWork.CA('LichOff_Select_Template', params)
        if (res.data) {
            const DSNgay = res.data[0] ?? []
            const DSNhanVien = res.data[1] ?? []
            return { DSNgay, DSNhanVien }
        }
    },
    LichOff_Select: async (params) => {
        // @LichLamViec_Id INT,
        // @MauBangCong_Id  INT,
        const res = await apiUtilWork.CA('LichOff_Select', params)
        if (res.data) {
            const DSNgay = res.data[0] ?? []
            const DSNhanVien = res.data[1] ?? []
            const CTBangCong = res.data[2][0]
            const CTLichLamViec = res.data[3][0]
            return { DSNgay, DSNhanVien, CTBangCong, CTLichLamViec }
        }
    },
    LichOff_Insert: async (params) => {
        //@LichLamViec_Id INT,
        //@MauBangCong_Id  INT,
        //@LichOff_JSON NVARCHAR(MAX)
        // Cấu trúc @LichOff_JSON
        // NhanVien_Id INT,
        // Ngay_01 BIT,
        // Ngay_02 BIT,
        // Ngay_03 BIT,
        const res = await apiUtilWork.CA('LichOff_Insert', params)
        if (res.data) {
            return true
        } else {
            return false
        }
    },
    LichOff_Delete: async (params) => {
        //@LichLamViec_Id INT,
        //@MauBangCong_Id  INT
        const res = await apiUtilWork.CA('LichOff_Delete', params)
        if (res.data) {
            return true
        } else {
            return false
        }
    },
}

const mauBangCongService = {
    MauBangCong_Select: async () => {
        const res = await apiUtilWork.CA('MauBangCong_Select')
        if (res.data) {
            return res.data
        }
    },
    MauBangCong_Select_By_Id: async (params) => {
        //@MauBangCong_Id INT
        const res = await apiUtilWork.CA('MauBangCong_Select_By_Id', params)
        if (res.data) {
            return res.data
        }
    },
    MauBangCong_Insert: async (params) => {
        // @NguoiQuanLy_Id INT,
        // @NguoiPhanCa_Id INT,
        // @NguoiChotCong_Id INT,
        // @MaMauBangCong VARCHAR(50),
        // @TenMauBangCong NVARCHAR(200),
        // @Is_CoDinh BIT,
        // @Is_CheckInOut BIT,
        // @T2_Is_NgayNghi BIT,
        // @T2_C1_VaoCa TIME,
        // @T2_C1_RaCa TIME,
        // @T2_C1_CaMau_Id INT,
        // @T2_C2_VaoCa TIME,
        // @T2_C2_RaCa TIME,
        // @T2_C2_CaMau_Id INT,
        // @T2_C3_VaoCa TIME,
        // @T2_C3_RaCa TIME,
        // @T2_C3_CaMau_Id INT,
        // @T3_Is_NgayNghi BIT,
        // @T3_C1_VaoCa TIME,
        // @T3_C1_RaCa TIME,
        // @T3_C1_CaMau_Id INT,
        // @T3_C2_VaoCa TIME,
        // @T3_C2_RaCa TIME,
        // @T3_C2_CaMau_Id INT,
        // @T3_C3_VaoCa TIME,
        // @T3_C3_RaCa TIME,
        // @T3_C3_CaMau_Id INT,
        // @T4_Is_NgayNghi BIT,
        // @T4_C1_VaoCa TIME,
        // @T4_C1_RaCa TIME,
        // @T4_C1_CaMau_Id INT,
        // @T4_C2_VaoCa TIME,
        // @T4_C2_RaCa TIME,
        // @T4_C2_CaMau_Id INT,
        // @T4_C3_VaoCa TIME,
        // @T4_C3_RaCa TIME,
        // @T4_C3_CaMau_Id INT,
        // @T5_Is_NgayNghi BIT,
        // @T5_C1_VaoCa TIME,
        // @T5_C1_RaCa TIME,
        // @T5_C1_CaMau_Id INT,
        // @T5_C2_VaoCa TIME,
        // @T5_C2_RaCa TIME,
        // @T5_C2_CaMau_Id INT,
        // @T5_C3_VaoCa TIME,
        // @T5_C3_RaCa TIME,
        // @T5_C3_CaMau_Id INT,
        // @T6_Is_NgayNghi BIT,
        // @T6_C1_VaoCa TIME,
        // @T6_C1_RaCa TIME,
        // @T6_C1_CaMau_Id INT,
        // @T6_C2_VaoCa TIME,
        // @T6_C2_RaCa TIME,
        // @T6_C2_CaMau_Id INT,
        // @T6_C3_VaoCa TIME,
        // @T6_C3_RaCa TIME,
        // @T6_C3_CaMau_Id INT,
        // @T7_Is_NgayNghi BIT,
        // @T7_C1_VaoCa TIME,
        // @T7_C1_RaCa TIME,
        // @T7_C1_CaMau_Id INT,
        // @T7_C2_VaoCa TIME,
        // @T7_C2_RaCa TIME,
        // @T7_C2_CaMau_Id INT,
        // @T7_C3_VaoCa TIME,
        // @T7_C3_RaCa TIME,
        // @T7_C3_CaMau_Id INT,
        // @CN_Is_NgayNghi BIT,
        // @CN_C1_VaoCa TIME,
        // @CN_C1_RaCa TIME,
        // @CN_C1_CaMau_Id INT,
        // @CN_C2_VaoCa TIME,
        // @CN_C2_RaCa TIME,
        // @CN_C2_CaMau_Id INT,
        // @CN_C3_VaoCa TIME,
        // @CN_C3_RaCa TIME,
        // @CN_C3_CaMau_Id INT
        const res = await apiUtilWork.CA('MauBangCong_Insert', params)
        if (res.data) {
            return true
        } else {
            return false
        }
    },
    MauBangCong_Update: async (params) => {
        // @MauBangCong_Id INT,
        // @NguoiQuanLy_Id INT,
        // @NguoiPhanCa_Id INT,
        // @NguoiChotCong_Id INT,
        // @MaMauBangCong VARCHAR(50),
        // @TenMauBangCong NVARCHAR(200),
        // @Is_CoDinh BIT,
        // @Is_CheckInOut BIT,
        // @CaHangTuan_JSON NVARCHAR(MAX)
        const res = await apiUtilWork.CA('MauBangCong_Update', params)
        if (res.data) {
            return true
        } else {
            return false
        }
    },
    MauBangCong_Delete: async (params) => {
        // @MauBangCong_Id INT
        const res = await apiUtilWork.CA('MauBangCong_Delete', params)
        if (res.data) {
            return true
        } else {
            return false
        }
    },
}

const nhomCaMauService = {
    NhomCaMau_Select: async () => {
        const res = await apiUtilWork.CA('NhomCaMau_Select')
        if (res.data) {
            return res.data
        }
    },
    NhomCaMau_Insert: async (params) => {
        // @TenNhomCaMau NVARCHAR(250),
        // @MaNhomCaMau NVARCHAR(50),
        // @Is_TamKhoa BIT
        const res = await apiUtilWork.CA('NhomCaMau_Insert', params)
        if (res.data) {
            return true
        } else {
            return false
        }
    },
    NhomCaMau_Delete: async (params) => {
        // @NhomCaMau_Id INT
        const res = await apiUtilWork.CA('NhomCaMau_Delete', params)
        if (res.data) {
            return true
        } else {
            return false
        }
    },
    NhomCaMau_Update: async (params) => {
        // @NhomCaMau_Id INT,
        // @TenNhomCaMau NVARCHAR(250),
        // @MaNhomCaMau NVARCHAR(50),
        // @Is_TamKhoa BIT
        const res = await apiUtilWork.CA('NhomCaMau_Update', params)
        if (res.data) {
            return true
        } else {
            return false
        }
    },
}

const caMauService = {
    CaMau_Select: async () => {
        const res = await apiUtilWork.CA('CaMau_Select')
        if (res.data) {
            return res.data
        }
    },
    CaMau_MauBangCong_Select: async (params) => {
        // @CaMau_Id INT
        const res = await apiUtilWork.CA('CaMau_MauBangCong_Select', params)
        if (res.data) {
            return res.data
        }
    },
}

const loaiCaService = {
    LoaiCa_MauBangCong_Insert: async (params) => {
        // @LoaiCa_Id INT,
        // @MauBangCong_Id_List NVARCHAR(1000)
        const res = await apiUtilWork.CA('LoaiCa_MauBangCong_Insert', params)
        if (res.data) {
            return true
        } else {
            return false
        }
    },
    LoaiCa_MauBangCong_Select: async (params) => {
        // @LoaiCa_Id INT
        const res = await apiUtilWork.CA('LoaiCa_MauBangCong_Select', params)
        if (res.data) {
            return res.data
        }
    },
}

const chuKyLuongService = {
    ChuKyLuong_Select: async () => {
        const res = await apiUtilWork.PA('ChuKyLuong_Select')
        if (res.data) {
            const DSChuKy = res.data[0]
            const DSMauBangLuong = res.data[1]
            return { DSChuKy, DSMauBangLuong }
        }
    },
    ChuKyLuong_MauBangLuong_Select: async (params) => {
        //@ChuKyLuong_Id INT
        const res = await apiUtilWork.PA('ChuKyLuong_MauBangLuong_Select', params)
        if (res.data) {
            return res.data
        }
    },
    ChuKyLuong_MauBangLuong_Insert: async (params) => {
        //@ChuKyLuong_Id INT,
        //@MauBangLuong_Id_List NVARCHAR(1000)
        const res = await apiUtilWork.PA('ChuKyLuong_MauBangLuong_Insert', params)
        if (res.data) {
            return true
        } else {
            return false
        }
    },
    ChuKyLuong_MauBangLuong_Delete: async (params) => {
        //@ChuKyLuong_MauBangLuong_Id INT
        const res = await apiUtilWork.PA('ChuKyLuong_MauBangLuong_Delete', params)
        if (res.data) {
            return true
        } else {
            return false
        }
    },

    ChuKyLuong_MauBangLuong_ThuocTinh_Select: async (params) => {
        //     @ChuKyLuong_Id INT,
        // @MauBangLuong_Id INT
        const res = await apiUtilWork.PA('ChuKyLuong_MauBangLuong_ThuocTinh_Select', params)

        if (res.data) {
            const CongThucLuong = res.data[0]
            const ThongTinBangLuong = res.data[1][0]
            const ThongTinChuKyLuong = res.data[2][0]
            return { CongThucLuong, ThongTinBangLuong, ThongTinChuKyLuong }
        }
    },
    ChuKyLuong_MauBangLuong_ThuocTinh_Delete: async (params) => {
        // @ChuKyLuong_MauBangLuong_ThuocTinh_Id INT
        const res = await apiUtilWork.PA('ChuKyLuong_MauBangLuong_ThuocTinh_Delete', params)
        if (res.data) {
            return true
        } else {
            return false
        }
    },
    ChuKyLuong_MauBangLuong_ThuocTinh_Insert: async (params) => {
        //     @ChuKyLuong_Id INT,
        // @MauBangLuong_Id INT,
        // @ThuTu INT,
        // @MaHeThong VARCHAR(50),
        // @LoaiThuocTinh VARCHAR(5),
        // @LoaiDuLieu VARCHAR(5),
        // @MaThuocTinh VARCHAR(50),
        // @TenThuocTinh NVARCHAR(250),
        // @CongThuc NVARCHAR(MAX),
        // @MoTa NVARCHAR(500)
        const res = await apiUtilWork.PA('ChuKyLuong_MauBangLuong_ThuocTinh_Insert', params)
        if (res.data) {
            return true
        } else {
            return false
        }
    },
    ChuKyLuong_MauBangLuong_ThuocTinh_Update: async (params) => {
        //     @ChuKyLuong_MauBangLuong_ThuocTinh_Id INT,
        // @ChuKyLuong_Id INT,
        // @MauBangLuong_Id INT,
        // @ThuTu INT,
        // @MaHeThong VARCHAR(50),
        // @LoaiThuocTinh VARCHAR(5),
        // @LoaiDuLieu VARCHAR(5),
        // @MaThuocTinh VARCHAR(100),
        // @TenThuocTinh NVARCHAR(250),
        // @CongThuc NVARCHAR(MAX),
        // @MoTa NVARCHAR(500),
        // @Is_TamKhoa BIT,
        // @Is_HienThi BIT
        const res = await apiUtilWork.PA('ChuKyLuong_MauBangLuong_ThuocTinh_Update', params)
        if (res.data) {
            return true
        } else {
            return res
        }
    },
    ChuKyLuong_TinhCong_Select: async (params) => {
        //     @ChuKyLuong_Id INT,
        // @MauBangLuong_Id INT
        const res = await apiUtilWork.PA('ChuKyLuong_TinhCong_Select', params)
        if (res.data) {
            const DSCongThucLuong = res.data[0]
            const DSNhanVien = res.data[1]
            const MauBangLuong = res.data[2][0]
            const ChuKyLuong = res.data[3][0]
            return { DSCongThucLuong, DSNhanVien, MauBangLuong, ChuKyLuong }
        }

    },
    ChuKyLuong_TinhCong_Select_Formula_By_NhanVien_Id: async (params) => {
        const res = await apiUtilWork.PA('ChuKyLuong_TinhCong_Select_Formula_By_NhanVien_Id', params)
        //@MauBangLuong_Id INT,
        // @ChuKyLuong_Id INT,
        // @NhanVien_Id INT
        if (res.data) {
            const ThongTinBangLuong = res.data[0]
            const ThongTinDuLieuLuong = res.data[1][0]
            const DSBienHeThong = res.data[2]
            const DSBienTuDinhNghia = res.data[3]
            const DSCongThucLuong = res.data[4]
            return { ThongTinBangLuong, ThongTinDuLieuLuong, DSBienHeThong, DSBienTuDinhNghia, DSCongThucLuong }
        }
    },

    ChuKyLuong_TinhCong_ChotLuong: async (params) => {
        const res = await apiUtilWork.PA('ChuKyLuong_TinhCong_ChotLuong', params)
        //@MauBangLuong_Id INT,
        // @ChuKyLuong_Id INT,
        if (res) {
            return true
        } else {
            return false
        }
    },
    ChuKyLuong_TinhCong_HuyChotLuong: async (params) => {
        const res = await apiUtilWork.PA('ChuKyLuong_TinhCong_HuyChotLuong', params)
        //@MauBangLuong_Id INT,
        // @ChuKyLuong_Id INT,
        if (res) {
            return true
        } else {
            return false
        }
    },
    ChuKyLuong_TinhCong_Update: async (params) => {
        const res = await apiUtilWork.PA('ChuKyLuong_TinhCong_Update', params)
        //     @ChuKyLuong_Id INT,
        // @MauBangLuong_Id INT,
        // @NhanVien_Id INT,
        // @ChuKyLuong_TinhCong_JSON NVARCHAR(MAX)
        if (res) {
            return true
        } else {
            return false
        }
    },
    ChuKyLuong_TinhCong_Select_By_NhanVien_Id: async (params) => {
        const res = await apiUtilWork.PA('ChuKyLuong_TinhCong_Select_By_NhanVien_Id', params)
        // @ChuKyLuong_Id INT,
        // @MauBangLuong_Id INT,
        // @NhanVien_Id INT
        if (res.data) {
            return res.data
        } else {
            return []
        }
    },
    ChuKyLuong_TinhCong_Apply_Formula_By_NhanVien_Id: async (params) => {
        const res = await apiUtilWork.PA('ChuKyLuong_TinhCong_Apply_Formula_By_NhanVien_Id', params)
        //     @MauBangLuong_Id INT,
        // @ChuKyLuong_Id INT,
        // @ChuKyLuong_TinhCong_JSON NVARCHAR(MAX)
        if (res.data) {
            return res.data
        } else {
            return []
        }
    },
    ChuKyLuong_TinhCong_ChotLuong_By_NhanVien_Id: async (params) => {
        const res = await apiUtilWork.PA('ChuKyLuong_TinhCong_ChotLuong_By_NhanVien_Id', params)
        //@MauBangLuong_Id INT,
        // @ChuKyLuong_Id INT,
        // @NhanVien_Id INT
        if (res) {
            return true
        } else {
            return false
        }
    },
    ChuKyLuong_TinhCong_HuyChotLuong_By_NhanVien_Id: async (params) => {
        const res = await apiUtilWork.PA('ChuKyLuong_TinhCong_HuyChotLuong_By_NhanVien_Id', params)
        //@MauBangLuong_Id INT,
        // @ChuKyLuong_Id INT,
        // @NhanVien_Id INT
        if (res) {
            return true
        } else {
            return false
        }
    },

    ChuKyLuong_TinhCong_DongBoDuLieu: async (params) => {
        const res = await apiUtilWork.PA('ChuKyLuong_TinhCong_DongBoDuLieu', params)
        //  @MauBangLuong_Id INT,
        // @ChuKyLuong_Id INT,
        // @Is_DongBo_NhanSu BIT,
        // @Is_DongBo_CauHinhCot BIT,
        // @Is_DongBo_CongThuc BIT
        if (res) {
            return true
        } else {
            return false
        }
    },

}

const mauBangLuongService = {
    MauBangLuong_Select: async () => {
        const res = await apiUtilWork.PA('MauBangLuong_Select')
        if (res.data) {
            return res.data
        }
    },
    MauBangLuong_Insert: async (params) => {
        // @NguoiChotLuong_Id INT,
        // @MaMauBangLuong NVARCHAR(50),
        // @TenMauBangLuong NVARCHAR(200)
        const res = await apiUtilWork.PA('MauBangLuong_Insert', params)
        if (res.data) {
            return true
        } else {
            return false
        }
    },
    MauBangLuong_Delete: async (params) => {
        //@MauBangLuong_Id INT
        const res = await apiUtilWork.PA('MauBangLuong_Delete', params)
        if (res.data) {
            return true
        } else {
            return false
        }
    },
}

const vaiTroService = {
    VaiTro_Select: async (params) => {
        const res = await apiUtilWork.HR('VaiTro_Select', params)
        if (res.data) {
            return res.data
        }
    },
    VaiTro_Insert: async (params) => {
        // @MaVaiTro NVARCHAR(50),
        // @TenVaiTro NVARCHAR(200),
        // @MauVaiTro NVARCHAR(20),
        // @MoTa NVARCHAR(500),
        // @Is_TamKhoa BIT
        const res = await apiUtilWork.HR('VaiTro_Insert', params)
        if (res.data) {
            return true
        } else {
            return false
        }
    },
    VaiTro_Update: async (params) => {
        // @VaiTro_Id INT,
        // @MaVaiTro NVARCHAR(50),
        // @TenVaiTro NVARCHAR(200),
        // @MauVaiTro NVARCHAR(20),
        // @MoTa NVARCHAR(500),
        // @Is_TamKhoa BIT
        const res = await apiUtilWork.HR('VaiTro_Update', params)
        if (res.data) {
            return true
        } else {
            return false
        }
    },
    VaiTro_Delete: async (params) => {
        //@VaiTro_Id INT
        const res = await apiUtilWork.HR('VaiTro_Delete', params)
        if (res.data) {
            return true
        } else {
            return false
        }
    },
    VaiTro_MauBangCong_Select: async (params) => {
        // @VaiTro_Id INT,
        const res = await apiUtilWork.HR('VaiTro_MauBangCong_Select', params)
        if (res.data) {
            return res.data
        }
    },
    VaiTro_MauBangCong_Insert: async (params) => {
        // @VaiTro_Id INT,
        // @MauBangCong_Id_List NVARCHAR(1000)
        const res = await apiUtilWork.HR('VaiTro_MauBangCong_Insert', params)
        if (res.data) {
            return true
        } else {
            return false
        }
    },
}

const chucDanhService = {
    ChucDanh_Select: async (params) => {
        const res = await apiUtilWork.HR('ChucDanh_Select', params)
        if (res.data) {
            return res.data
        }
    },
    ChucDanh_Delete: async (params) => {
        //ChucDanh_Id INT
        const res = await apiUtilWork.HR('ChucDanh_Delete', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
    ChucDanh_Insert: async (params) => {
        //TenChucDanh nvarchar(200)
        //MoTa nvarchar(500)
        //Is_TamKhoa BIT
        const res = await apiUtilWork.HR('ChucDanh_Insert', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
    ChucDanh_Update: async (params) => {
        //ChucDanh_Id INT
        //TenChucDanh nvarchar(200)
        //MoTa nvarchar(500)
        //Is_TamKhoa BIT
        const res = await apiUtilWork.HR('ChucDanh_Update', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
}

const bacLuongService = {
    BacLuong_Select: async (params) => {
        const res = await apiUtilWork.HR('BacLuong_Select', params)
        if (res.data) {
            return res.data
        }
    },
}

const bacThuongService = {
    BacThuong_Select: async (params) => {
        const res = await apiUtilWork.HR('BacThuong_Select', params)
        if (res.data) {
            return res.data
        }
    },
}

const khuVucChuyenMonService = {
    KhuVucChuyenMon_Select: async () => {
        const res = await apiUtilWork.HR('KhuVucChuyenMon_Select')
        if (res.data) {
            return res.data
        }
    },
    KhuVucChuyenMon_Insert: async (params) => {
        // @MaKhuVucChuyenMon NVARCHAR(50),
        // @TenKhuVucChuyenMon NVARCHAR(200),
        // @MoTa NVARCHAR(500),
        // @Is_TamKhoa BIT
        const res = await apiUtilWork.HR('KhuVucChuyenMon_Insert', params)
        if (res.data) {
            return true
        } else {
            return false
        }
    },
    KhuVucChuyenMon_Update: async (params) => {
        // @KhuVucChuyenMon_Id INT,
        // @MaKhuVucChuyenMon NVARCHAR(50),
        // @TenKhuVucChuyenMon NVARCHAR(200),
        // @MoTa NVARCHAR(500),
        // @Is_TamKhoa BIT
        const res = await apiUtilWork.HR('KhuVucChuyenMon_Update', params)
        if (res.data) {
            return true
        } else {
            return false
        }
    },
    KhuVucChuyenMon_Delete: async (params) => {
        //@KhuVucChuyenMon_Id INT
        const res = await apiUtilWork.HR('KhuVucChuyenMon_Delete', params)
        if (res.data) {
            return true
        } else {
            return false
        }
    },
}

const bienService = {
    Bien_Select_Calendar: async () => {
        const res = await apiUtilWork.CT('Bien_Select_Calendar')
        if (res.data) {
            const DSNhomBien = res.data[0]
            const DSBienHeThong = res.data[1]
            return { DSNhomBien, DSBienHeThong }
        }
    },
}

const diaDiemService = {
    VanPhong_IP_Select: async (params) => {
        const res = await apiUtilWork.HR('VanPhong_IP_Select', params)
        if (res.data) {
            return res.data
        }
    },
    VanPhong_IP_Insert: async (params) => {
        // @VanPhong_Id INT,
        // @DiaChiIP VARCHAR(20),
        // @Is_TamKhoa BIT
        const res = await apiUtilWork.HR('VanPhong_IP_Insert', params)
        if (res.data) {
            return true
        } else {
            return false
        }
    },
    VanPhong_IP_Update: async (params) => {
        // @VanPhong_IP_Id INT,
        // @VanPhong_Id INT,
        // @DiaChiIP VARCHAR(20),
        // @Is_TamKhoa BIT
        const res = await apiUtilWork.HR('VanPhong_IP_Update', params)
        if (res.data) {
            return true
        } else {
            return false
        }
    },
    VanPhong_IP_Delete: async (params) => {
        // @VanPhong_IP_Id INT,
        const res = await apiUtilWork.HR('VanPhong_IP_Delete', params)
        if (res.data) {
            return true
        } else {
            return false
        }
    },
}

const caService = {
    CaMau_Select_By_Id: async (params) => {
        // @CaMau_Id
        const res = await apiUtilWork.CA('CaMau_Select_By_Id', params)
        if (res.data) {
            return res.data
        }
    },
    LichLamViec_PhanCa_Insert: async (params) => {
        // @LichLamViec_Id INT,
        // @MauBangCong_Id INT,
        // @Ngay INT,
        // @CaMau_Id INT,
        // @LoaiCa_Id INT,
        // @NhanVien_Id INT,
        // @VanPhong_Id INT,
        // @LoaiViTri_Id_List VARCHAR(500),
        // @GioBatDau TIME,
        // @GioKetThuc TIME,
        // @SoPhutNghi INT,
        // @SoCongChuan NUMERIC(18, 2),
        // @BatDauCa_Som TIME,
        // @BatDauCa_Tre TIME,
        // @KetThucCa_Som TIME,
        // @KetThucCa_Tre TIME,
        // @Is_CaQuaDem BIT,
        // @Is_DaoTao BIT
        // @Is_XuatBan BIT
        const res = await apiUtilWork.CA('LichLamViec_PhanCa_Insert', params)
        if (res.data) {
            return true
        } else {
            return false
        }
    },
    LichLamViec_PhanCa_Update: async (params) => {
        // @LichLamViec_PhanCa_Id INT,
        // @CaMau_Id INT,
        // @LoaiCa_Id INT,
        // @VanPhong_Id INT,
        // @LoaiViTri_Id_List VARCHAR(500),
        // @GioBatDau TIME,
        // @GioKetThuc TIME,
        // @SoPhutNghi INT,
        // @SoCongChuan NUMERIC(18, 2),
        // @BatDauCa_Som TIME,
        // @BatDauCa_Tre TIME,
        // @KetThucCa_Som TIME,
        // @KetThucCa_Tre TIME,
        // @Is_CaQuaDem BIT,
        // @Is_DaoTao BIT
        const res = await apiUtilWork.CA('LichLamViec_PhanCa_Update', params)
        if (res.data) {
            return true
        } else {
            return false
        }
    },
    LichLamViec_PhanCa_Delete: async (params) => {
        // @LichLamViec_PhanCa_Id INT
        const res = await apiUtilWork.CA('LichLamViec_PhanCa_Delete', params)
        if (res.data) {
            return true
        } else {
            return false
        }
    },
    // Xuất bản 1 ca
    LichLamViec_PhanCa_XuatBan_Ca: async (params) => {
        // @LichLamViec_PhanCa_Id INT
        const res = await apiUtilWork.CA('LichLamViec_PhanCa_XuatBan_Ca', params)
        if (res.data) {
            return true
        } else {
            return false
        }
    },
    // Xuất bản tất cả ca trong lịch
    LichLamViec_PhanCa_XuatBan_Lich: async (params) => {
        //  @LichLamViec_Id INT,
        // @MauBangCong_Id INT
        const res = await apiUtilWork.CA('LichLamViec_PhanCa_XuatBan_Lich', params)
        if (res.data) {
            return true
        } else {
            return false
        }
    },
    // Giao ca cho nhân viên khác
    LichLamViec_PhanCa_Update_NhanVien: async (params) => {
        // @LichLamViec_PhanCa_Id INT,
        // @NhanVien_Id INT
        const res = await apiUtilWork.CA('LichLamViec_PhanCa_Update_NhanVien', params)
        if (res.data) {
            return true
        } else {
            return false
        }
    },
    LichLamViec_TinhCong_Select_Thang_By_NhanVien_Id: async (params) => {
        // LichLamViec_Id INT
        // NhanVien_Id INT
        // MauTinhCong_Id INT
        const res = await apiUtilWork.CA('LichLamViec_TinhCong_Select_Thang_By_NhanVien_Id', params)
        if (res.data) {
            return res.data
        }
    },
}

const loaiViTriService = {
    LoaiViTri_Select: async (params) => {
        const res = await apiUtilWork.WK('LoaiViTri_Select', params)
        if (res.data) {
            return res.data
        }
    },
    LoaiViTri_Select_ViTri: async (params) => {
        const res = await apiUtilWork.WK('LoaiViTri_Select_ViTri', params)
        if (res.data) {
            return res.data
        }
    },
    LoaiViTri_Select_VaiTro: async (params) => {
        const res = await apiUtilWork.WK('LoaiViTri_Select_VaiTro', params)
        if (res.data) {
            return res.data
        }
    },
}

const loaiViTriHRService = {
    LoaiViTri_Select: async (params) => {
        const res = await apiUtilWork.HR('LoaiViTri_Select', params)
        if (res.data) {
            return res.data
        }
    },
    LoaiViTri_Delete: async (params) => {
        //@LoaiViTri_Id 
        const res = await apiUtilWork.HR('LoaiViTri_Delete', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
    LoaiViTri_Insert: async (params) => {
        //@TenLoaiViTri 
        //@MoTa 
        //@Is_TamKhoa 
        const res = await apiUtilWork.HR('LoaiViTri_Insert', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
    LoaiViTri_Update: async (params) => {
        //@LoaiViTri_Id 
        //@TenLoaiViTri 
        //@MoTa 
        //@Is_TamKhoa 
        const res = await apiUtilWork.HR('LoaiViTri_Update', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
}

const viTriService = {
    ViTri_Select: async () => {
        const res = await apiUtilWork.HR('ViTri_Select')
        if (res.data) {
            return res.data
        }
    },
}

const checkInOutService = {
    CheckInOut_Select_Lich: async (params) => {
        const res = await apiUtilWork.IO('CheckInOut_Select_Lich', params)
        if (res.data) {
            const DSNgay = res.data[0]
            const DSChamCong = res.data[1]
            const DSNhanVien = res.data[2]
            const CTMauBangCong = res.data[3][0]
            const CTLichLamViec = res.data[4][0]
            return { DSNgay, DSChamCong, DSNhanVien, CTMauBangCong, CTLichLamViec }
        }
    },
    CheckInOut_Select_By_NhanVien_Id: async (params) => {
        const res = await apiUtilWork.IO('CheckInOut_Select_By_NhanVien_Id', params)
        if (res.data) {
            return res.data
        }
    },
    CheckInOut_Insert: async (params) => {
        //VanPhong_Id INT
        //NhanVien_Id INT
        //Ngay INT
        //Thang INT
        //Nam INT
        //Gio TIME
        //Ghichu NVARCHAR(500)
        const res = await apiUtilWork.IO('CheckInOut_Insert', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
    CheckInOut_Update: async (params) => {
        //CheckInOut_Id INT
        //VanPhong_Id INT
        //Gio TIME
        //Ghichu NVARCHAR(500)
        const res = await apiUtilWork.IO('CheckInOut_Update', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
    CheckInOut_Delete: async (params) => {
        //CheckInOut_Id INT
        const res = await apiUtilWork.IO('CheckInOut_Delete', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
    //Import chấm công
    CheckInOut_Select_Template: async (params) => {
        //@LichLamViec_Id INT
        //@MauBangCong INT
        const res = await apiUtilWork.IO('CheckInOut_Select_Template', params)
        if (res.data) {
            const DSNgay = res.data[0] ?? []
            const DSNhanVien = res.data[1] ?? []
            const CTMauBangCong = res.data[2][0]
            const CTLichLamViec = res.data[3][0]
            return {
                DSNgay,
                DSNhanVien,
                CTMauBangCong,
                CTLichLamViec
            }
        }
    },
    CheckInOut_Import: async (params) => {
        // @LichLamViec_Id INT,
        // @MauBangCong_Id INT,
        // @CheckInOut_JSON NVARCHAR(MAX)
        const res = await apiUtilWork.IO('CheckInOut_Import', params)
        if (res.data) {
            return true
        } else {
            return false
        }
    },
    CheckInOut_Select_By_NgayThangNam: async (params) => {
        //     @NhanVien_Id INT,
        // @Ngay INT,
        // @Thang INT,
        // @Nam INT
        const res = await apiUtilWork.IO('CheckInOut_Select_By_NgayThangNam', params)
        if (res.data) {
            return res.data
        } else {
            return false
        }
    },
}

const nhanVienService = {
    NhanVien_Update_ThongTin_Cong: async (params) => {
        //NhanVien_Id INT,
        //VanPhong_Id INT,
        //NhomCaMau_Id INT,
        //MauBangCong_Id INT,
        //MauBangLuong_Id INT,
        //ViTri_Id INT,
        //HinhThuc_Id INT,
        //ChucDanh_Id INT,
        //VaiTro_Id_List NVARCHAR(500)
        const res = await apiUtilWork.HR('NhanVien_Update_ThongTin_Cong', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
    NhanVien_VaiTro_Select: async () => {
        const res = await apiUtilWork.HR('NhanVien_VaiTro_Select')
        if (res.data) {
            return res.data
        }
    },
    NhanVien_VaiTro_Select_By_NhanVien_Id: async (params) => {
        const res = await apiUtilWork.HR('NhanVien_VaiTro_Select_By_NhanVien_Id', params)
        if (res.data) {
            return res.data
        }
    },
    NhanVien_Update_ThongTin_Luong: async (params) => {
        // NhanVien_Id,
        // LuongCoBan,
        // PhuCap_Com
        const res = await apiUtilWork.HR('NhanVien_Update_ThongTin_Luong', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
    NhanVien_Update_ThongTin_Coban: async (params) => {
        // NhanVien_Id
        // HoVaTenDem
        // TenNhanVien
        // DienThoai
        // MaNhanVien
        // ChucDanh_Id
        // NgaySinh
        // ThangSinh
        // NamSinh
        // GioiTinh
        // TrangThai_HonNhan
        // NgayBatDau
        // NgayChinhThuc
        // GhiChu
        // Is_TamKhoa
        const res = await apiUtilWork.HR('NhanVien_Update_ThongTin_Coban', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
    NhanVien_Update_ThongTin_NhomQuanLy: async (params) => {
        // NhanVien_Id,
        // NhomNhanVien_Id,
        // NguoiQuanLy_1_Id,
        // NguoiQuanLy_2_Id,
        const res = await apiUtilWork.HR('NhanVien_Update_ThongTin_NhomQuanLy', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
    NhanVien_Delete: async (params) => {
        // NhanVien_Id,
        const res = await apiUtilWork.HR('NhanVien_Delete', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
    NhanVien_Insert: async (params) => {
        // @ChucDanh_Id INT,
        // @ViTri_Id INT,
        // @NhomCaMau_Id INT,
        // @VanPhong_Id INT,
        // @HopDong_Id INT,
        // @HinhThuc_Id INT,
        // @MauBangCong_Id INT,
        // @MauBangLuong_Id INT,
        // @BacLuong_Id INT,
        // @BacThuong_Id INT,
        // @ThangTien_Id INT,
        // @NhomNhanVien_Id INT,
        // @NguoiQuanLy_1_Id INT,
        // @NguoiQuanLy_2_Id INT,
        // @AnhDaiDien_Url NVARCHAR(500),
        // @MaNhanVien VARCHAR(15),
        // @MaChamCong VARCHAR(10),
        // @MaSoThue NVARCHAR(50),
        // @HoVaTenDem NVARCHAR(300),
        // @TenNhanVien NVARCHAR(250),
        // @BietDanh NVARCHAR(150),
        // @GioiTinh TINYINT,
        // @DienThoai NVARCHAR(50),
        // @DienThoai_Khac NVARCHAR(50),
        // @Email NVARCHAR(150),
        // @Email_Khac NVARCHAR(150),
        // @LinkedIn NVARCHAR(250),
        // @Facebook NVARCHAR(250),
        // @Website NVARCHAR(250),
        // @DiaChi_TamTru NVARCHAR(500),
        // @DiaChi_ThuongTru NVARCHAR(500),
        // @NgaySinh INT,
        // @ThangSinh INT,
        // @NamSinh INT,
        // @NoiSinh NVARCHAR(50),
        // @QuocTich NVARCHAR(50),
        // @LuongCoBan NUMERIC(18, 2),
        // @PhuCap_Com NUMERIC(18, 2),
        // @NgayChinhThuc DATE,
        // @NgayBatDau DATE,
        // @NgayNghiViec DATE,
        // @So_CCCD NVARCHAR(20),
        // @NgayCap_CCCD NVARCHAR(10),
        // @NoiCap_CCCD NVARCHAR(250),
        // @DiaChi_CCCD NVARCHAR(500),
        // @So_BHXH NVARCHAR(50),
        // @NoiDangKy_BHXH NVARCHAR(250),
        // @SoTaiKhoan_NganHang NVARCHAR(50),
        // @TenTaiKhoan_NganHang NVARCHAR(150),
        // @Ten_NganHang NVARCHAR(500),
        // @ChiNhanh_NganHang NVARCHAR(500),
        // @TrangThai_LamViec TINYINT,
        // @TrangThai_HonNhan TINYINT,
        // @NgayHetHan DATE,
        // @GhiChu NVARCHAR(500),
        // @Is_GiamTruThue BIT,
        // @Is_CoNguoiPhuThuoc BIT,
        // @Is_TamKhoa BIT,
        // @HoSoXinViec_FileId_List NVARCHAR(MAX),
        // @ThongTinHocVan_JSON NVARCHAR(MAX),
        // @LichSuLamViec_JSON NVARCHAR(MAX),
        // @ThongTinGiaDinh_JSON NVARCHAR(MAX)
        const res = await apiUtilWork.HR('NhanVien_Insert', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
    NhanVien_Update: async (params) => {
        // @NhanVien_Id INT,
        // @ChucDanh_Id INT,
        // @ViTri_Id INT,
        // @NhomCaMau_Id INT,
        // @VanPhong_Id INT,
        // @HinhThuc_Id INT,
        // @MauBangCong_Id INT,
        // @MauBangLuong_Id INT,
        // @BacLuong_Id INT,
        // @BacThuong_Id INT,
        // @NhomNhanVien_Id INT,
        // @AnhDaiDien_Url NVARCHAR(500),
        // @MaChamCong VARCHAR(10),
        // @MaSoThue NVARCHAR(50),
        // @HoVaTenDem NVARCHAR(300),
        // @TenNhanVien NVARCHAR(250),
        // @BietDanh NVARCHAR(150),
        // @GioiTinh TINYINT,
        // @DienThoai NVARCHAR(50),
        // @DienThoai_Khac NVARCHAR(50),
        // @Email NVARCHAR(150),
        // @Email_Khac NVARCHAR(150),
        // @LinkedIn NVARCHAR(250),
        // @Facebook NVARCHAR(250),
        // @Website NVARCHAR(250),
        // @DiaChi_TamTru NVARCHAR(500),
        // @DiaChi_ThuongTru NVARCHAR(500),
        // @NgaySinh INT,
        // @ThangSinh INT,
        // @NamSinh INT,
        // @NoiSinh NVARCHAR(50),
        // @QuocTich NVARCHAR(50),
        // @LuongCoBan NUMERIC(18, 2),
        // @NgayChinhThuc DATE,
        // @NgayBatDau DATE,
        // @So_CCCD NVARCHAR(20),
        // @NgayCap_CCCD NVARCHAR(10),
        // @NoiCap_CCCD NVARCHAR(250),
        // @So_BHXH NVARCHAR(50),
        // @NoiDangKy_BHXH NVARCHAR(250),
        // @SoTaiKhoan_NganHang NVARCHAR(50),
        // @TenTaiKhoan_NganHang NVARCHAR(150),
        // @Ten_NganHang NVARCHAR(500),
        // @ChiNhanh_NganHang NVARCHAR(500),
        // @TrangThai_HonNhan TINYINT,
        // @NgayHetHan DATE,
        // @GhiChu NVARCHAR(500),
        // @Is_GiamTruThue BIT,
        // @Is_CoNguoiPhuThuoc BIT
        const res = await apiUtilWork.HR('NhanVien_Update', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
    NhanVien_Select: async (formFilter) => {
        // const { TimKiem, TrangThai_LamViec, PageIndex, PageSize, MauBangCong_Id_List, MauBangLuong_Id_List, } = formFilter
        const res = await apiUtilWork.HR('NhanVien_Select', formFilter)
        if (res.data) {
            const Pagination = res.data[0][0]
            const DSNhanVien = res.data[1]
            return { Pagination, DSNhanVien }
        }
    },
    NhanVien_Select_Search: async (params) => {
        const res = await apiUtilWork.HR('NhanVien_Select_Search', params)
        if (res.data) {
            return res.data
        }
    },
    NhanVien_Select_By_Id: async (params) => {
        // @NhanVien_Id INT
        const res = await apiUtilWork.HR('NhanVien_Select_By_Id', params)
        if (res.data) {
            const ThongTinNhanSu = res.data[0][0]
            const ThongTinHoSo = res.data[1]
            const ThongTinHocVan = res.data[2]
            const ThongTinLichSuLamViec = res.data[3]
            const ThongTinGiaDinhNguoiPhuThuoc = res.data[4]
            return {
                ThongTinNhanSu,
                ThongTinHoSo,
                ThongTinHocVan,
                ThongTinLichSuLamViec,
                ThongTinGiaDinhNguoiPhuThuoc
            }
        }
    },
    NhanVien_HoSo_Insert: async (params) => {
        const res = await apiUtilWork.HR('NhanVien_HoSo_Insert', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
    NhanVien_HoSo_Delete: async (params) => {
        const res = await apiUtilWork.HR('NhanVien_HoSo_Delete', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
    NhanVien_HocVan_Insert: async (params) => {
        console.log(params);
        const res = await apiUtilWork.HR('NhanVien_HocVan_Insert', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
    NhanVien_HocVan_Update: async (params) => {
        const res = await apiUtilWork.HR('NhanVien_HocVan_Update', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
    NhanVien_HocVan_Delete: async (params) => {
        const res = await apiUtilWork.HR('NhanVien_HocVan_Delete', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
    NhanVien_LichSuLamViec_Insert: async (params) => {
        // @NhanVien_Id INT,
        // @CongTy NVARCHAR(500),
        // @ChucDanh NVARCHAR(250),
        // @KhoanThoiGian NVARCHAR(300),
        // @DiaChi NVARCHAR(500),
        // @NhiemVuCongViec NVARCHAR(500)
        const res = await apiUtilWork.HR('NhanVien_LichSuLamViec_Insert', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
    NhanVien_LichSuLamViec_Update: async (params) => {
        // @NhanVien_LichSuLamViec_Id INT,
        // @CongTy NVARCHAR(500),
        // @ChucDanh NVARCHAR(250),
        // @KhoanThoiGian NVARCHAR(300),
        // @DiaChi NVARCHAR(500),
        // @NhiemVuCongViec NVARCHAR(500)
        const res = await apiUtilWork.HR('NhanVien_LichSuLamViec_Update', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
    NhanVien_LichSuLamViec_Delete: async (params) => {
        //@NhanVien_LichSuLamViec_Id INT
        const res = await apiUtilWork.HR('NhanVien_LichSuLamViec_Delete', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
    NhanVien_GiaDinh_Insert: async (params) => {
        const res = await apiUtilWork.HR('NhanVien_GiaDinh_Insert', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
    NhanVien_GiaDinh_Update: async (params) => {
        const res = await apiUtilWork.HR('NhanVien_GiaDinh_Update', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
    NhanVien_GiaDinh_Delete: async (params) => {
        const res = await apiUtilWork.HR('NhanVien_GiaDinh_Delete', params)
        if (res) {
            return true
        } else {
            return false
        }
    }
}
const nhomNhanVienService = {
    NhomNhanVien_Select: async () => {
        const res = await apiUtilWork.HR('NhomNhanVien_Select')
        if (res.data) {
            return res.data
        }
    },
    NhomNhanVien_Delete: async (params) => {
        //NhomNhanVien_Id INT
        const res = await apiUtilWork.HR('NhomNhanVien_Delete', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
    NhomNhanVien_Insert: async (params) => {
        //MaNhom nvarchar(50)
        //TenNhom nvarchar(200)
        //MoTa nvarchar(500)
        //Is_TamKhoa BIT
        const res = await apiUtilWork.HR('NhomNhanVien_Insert', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
    NhomNhanVien_Update: async (params) => {
        //NhomNhanVien_Id INT
        //MaNhom nvarchar(50)
        //TenNhom nvarchar(200)
        //MoTa nvarchar(500)
        //Is_TamKhoa BIT
        const res = await apiUtilWork.HR('NhomNhanVien_Update', params)
        if (res) {
            return true
        } else {
            return false
        }
    }

}
const hinhThucService = {
    HinhThuc_Select: async () => {
        const res = await apiUtilWork.HR('HinhThuc_Select')
        if (res.data) {
            return res.data
        }
    }
}
const phucLoiService = {
    PhucLoi_Select: async () => {
        const res = await apiUtilWork.HR('PhucLoi_Select')
        if (res.data) {
            return res.data
        }
    }
}
const nhanVienPhucLoiService = {
    NhanVien_PhucLoi_Select: async () => {
        const res = await apiUtilWork.HR('NhanVien_PhucLoi_Select')
        if (res.data) {
            return res.data
        }
    },
    NhanVien_PhucLoi_Insert: async (params) => {
        //NhanVien_Id INT
        //PhucLoi_Id INT
        //NgayApDung DATE
        //GhiChu NVARCHAR(500)
        const res = await apiUtilWork.HR('NhanVien_PhucLoi_Insert', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
    NhanVien_PhucLoi_Delete: async (params) => {
        //NhanVien_PhucLoi_Id
        const res = await apiUtilWork.HR('NhanVien_PhucLoi_Delete', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
    NhanVien_PhucLoi_Update: async (params) => {
        //NhanVien_PhucLoi_Id INT
        //PhucLoi_Id INT
        //NgayApDung DATE
        //GhiChu NVARCHAR(500)
        const res = await apiUtilWork.HR('NhanVien_PhucLoi_Update', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
}

const nhanVienBaoHiemService = {
    NhanVien_ChinhSach_BaoHiem_Select: async () => {
        const res = await apiUtilWork.HR('NhanVien_ChinhSach_BaoHiem_Select')
        if (res.data) {
            return res.data
        }
    },
    NhanVien_ChinhSach_BaoHiem_Insert: async (params) => {
        //NhanVien_Id INT
        //ChinhSach_BaoHiem_Id INT
        //NgayThamGia DATE
        //LuongDongBaoHiem NUMERIC(18,0)
        //GhiChu NVARCHAR(500)
        //MucDichTao TINYINT -- 1: Tạo  đăng ký mới, 2: Ghi đè đăng ký cuối cùng, 3:Tạo đăng ký trong quá khứ, 4:Tạo đăng ký đầu tiên
        const res = await apiUtilWork.HR('NhanVien_ChinhSach_BaoHiem_Insert', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
    NhanVien_ChinhSach_BaoHiem_Update: async (params) => {
        //NhanVien_ChinhSach_BaoHiem_Id INT
        //ChinhSach_BaoHiem_Id INT
        //NgayThamGia DATE
        //LuongDongBaoHiem NUMERIC(18,0)
        //GhiChu NVARCHAR(500)
        //MucDichTao TINYINT -- 1: Tạo  đăng ký mới, 2: Ghi đè đăng ký cuối cùng, 3:Tạo đăng ký trong quá khứ, 4:Tạo đăng ký đầu tiên
        const res = await apiUtilWork.HR('NhanVien_ChinhSach_BaoHiem_Update', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
    NhanVien_ChinhSach_BaoHiem_Delete: async (params) => {
        //ChinhSach_BaoHiem_Id INT
        const res = await apiUtilWork.HR('NhanVien_ChinhSach_BaoHiem_Delete', params)
        if (res) {
            return true
        } else {
            return false
        }
    }
}

const nhanVienNghiPhepService = {
    NhanVien_ChinhSach_NghiPhep_Select: async () => {
        const res = await apiUtilWork.HR('NhanVien_ChinhSach_NghiPhep_Select')
        if (res.data) {
            return res.data
        }
    },
    NhanVien_ChinhSach_NghiPhep_Insert: async (params) => {
        //NhanVien_Id INT
        //ChinhSach_NghiPhep_Id INT
        //NgayHieuLuc DATE
        //SoPhepTrongNam INT
        //SoPhepTon INT
        //GhiChu NVARCHAR(500)
        //Is_NghiBu
        const res = await apiUtilWork.HR('NhanVien_ChinhSach_NghiPhep_Insert', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
    NhanVien_ChinhSach_NghiPhep_Update: async (params) => {
        //NhanVien_ChinhSach_NghiPhep_Id INT
        //ChinhSach_NghiPhep_Id INT
        //NgayHieuLuc DATE
        //SoPhepTrongNam INT
        //SoPhepTon INT
        //GhiChu NVARCHAR(500)
        //Is_NghiBu
        const res = await apiUtilWork.HR('NhanVien_ChinhSach_NghiPhep_Update', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
    NhanVien_ChinhSach_NghiPhep_Delete: async (params) => {
        //ChinhSach_NghiPhep_Id INT
        const res = await apiUtilWork.HR('NhanVien_ChinhSach_NghiPhep_Delete', params)
        if (res) {
            return true
        } else {
            return false
        }
    }
}

const chinhSachNghiPhepService = {
    ChinhSach_NghiPhep_Select: async () => {
        const res = await apiUtilWork.HR('ChinhSach_NghiPhep_Select')
        if (res.data) {
            return res.data
        }
    },
}

const mauBangLuongCongThucService = {
    MauBangLuong_Select_By_Id: async (params) => {
        //MauBangLuong_Id
        const res = await apiUtilWork.PA('MauBangLuong_Select_By_Id', params)
        if (res.data) {
            return res.data
        }
    }
}

const mauBangCongCongThucService = {
    MauBangCong_Select_By_Id: async (params) => {
        //MauBangCong_Id
        const res = await apiUtilWork.CA('MauBangCong_Select_By_Id', params)
        if (res.data) {
            return res.data
        }
    }
}


const nhanVienBacLuong = {
    NhanVien_BacLuong_Insert: async (params) => {
        //NhanVien_Id
        //BacLuong_Id,
        //NgayBatDau,
        //Is_HienTai
        const res = await apiUtilWork.HR('NhanVien_BacLuong_Insert', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
    NhanVien_BacLuong_Delete: async (params) => {
        //NhanVien_BacLuong_Id
        const res = await apiUtilWork.HR('NhanVien_BacLuong_Delete', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
    NhanVien_BacLuong_Select: async (params) => {
        //NhanVien_Id
        const res = await apiUtilWork.HR('NhanVien_BacLuong_Select', params)
        if (res.data) {
            return res.data
        } else {
            return []
        }
    }
}

const nhanVienBacThuong = {
    NhanVien_BacThuong_Insert: async (params) => {
        //NhanVien_Id
        //BacThuong_Id,
        //NgayBatDau,
        //Is_HienTai
        const res = await apiUtilWork.HR('NhanVien_BacThuong_Insert', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
    NhanVien_BacThuong_Delete: async (params) => {
        //NhanVien_BacThuong_Id
        const res = await apiUtilWork.HR('NhanVien_BacThuong_Delete', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
    NhanVien_BacThuong_Select: async (params) => {
        //NhanVien_Id
        const res = await apiUtilWork.HR('NhanVien_BacThuong_Select', params)
        if (res.data) {
            return res.data
        } else {
            return []
        }
    }
}

const phongBanService = {
    PhongBan_Select: async () => {
        const res = await apiUtilWork.HR('PhongBan_Select')
        if (res.data) {
            const DSPhongBan = res.data[0] ?? []
            const DSNhanVien = res.data[1] ?? []

            return {
                DSPhongBan,
                DSNhanVien
            }
        }
    },
    PhongBan_Insert: async (params) => {
        // @PhongBan_Parent_Id INT,
        // @TenPhongBan NVARCHAR(250),
        // @NguoiQuanLy_ViTri_Id INT,
        // @NhiemVu NVARCHAR(1000),
        // @NguoiQuanLy_Id_List NVARCHAR(MAX),
        // @NguoiTroLy_Id_List NVARCHAR(MAX)
        const res = await apiUtilWork.HR('PhongBan_Insert', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
    PhongBan_Update: async (params) => {
        // @PhongBan_Id INT,
        // @PhongBan_Parent_Id INT,
        // @TenPhongBan NVARCHAR(250),
        // @NguoiQuanLy_ViTri_Id INT,
        // @NhiemVu NVARCHAR(1000),
        // @NguoiQuanLy_Id_List NVARCHAR(MAX),
        // @NguoiTroLy_Id_List NVARCHAR(MAX)
        const res = await apiUtilWork.HR('PhongBan_Update', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
    PhongBan_Delete: async (params) => {
        // @PhongBan_Id INT
        const res = await apiUtilWork.HR('PhongBan_Delete', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
    PhongBan_Select_NhanVien: async (params) => {
        // @PhongBan_Id INT
        const res = await apiUtilWork.HR('PhongBan_Select_NhanVien', params)
        if (res.data) {
            return res.data
        }
    },
    PhongBan_Insert_NhanVien: async (params) => {
        //     @PhongBan_Id INT,
        // @NhanVien_Id INT
        const res = await apiUtilWork.HR('PhongBan_Insert_NhanVien', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
    PhongBan_Delete_NhanVien: async (params) => {
        // @NhanVien_Id INT
        const res = await apiUtilWork.HR('PhongBan_Delete_NhanVien', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
}

const viTriHRService = {
    ViTri_MauBangCong_Insert: async (params) => {
        //@ViTri_Id
        //@MauBangCong_Id_List NVARCHAR(1000)
        const res = await apiUtilWork.HR('ViTri_MauBangCong_Insert', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
    ViTri_MauBangCong_Select: async (params) => {
        //@ViTri_Id
        const res = await apiUtilWork.HR('ViTri_MauBangCong_Select', params)
        if (res.data) {
            return res.data
        }
    }
}

const nhomChinhSachService = {
    NhomChinhSach_LamThem_Select: async () => {
        const res = await apiUtilWork.OT('NhomChinhSach_LamThem_Select')
        if (res.data) {
            return res.data
        } else {
            return []
        }
    },
    NhomChinhSach_LamThem_Insert: async (params) => {
        //     @TenNhomChinhSach_LamThem NVARCHAR(200),
        // @MoTa NVARCHAR(500),
        // @Is_TamKhoa BIT
        const res = await apiUtilWork.OT('NhomChinhSach_LamThem_Insert', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
    NhomChinhSach_LamThem_Update: async (params) => {
        // @NhomChinhSach_LamThem_Id INT,
        // @TenNhomChinhSach_LamThem NVARCHAR(200),
        // @MoTa NVARCHAR(500),
        // @Is_TamKhoa BIT
        const res = await apiUtilWork.OT('NhomChinhSach_LamThem_Update', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
    NhomChinhSach_LamThem_Delete: async (params) => {
        // @NhomChinhSach_LamThem_Id INT,
        const res = await apiUtilWork.OT('NhomChinhSach_LamThem_Delete', params)
        if (res) {
            return true
        } else {
            return false
        }
    },

}


const chinhSachService = {
    ChinhSach_LamThem_Select: async () => {
        const res = await apiUtilWork.OT('ChinhSach_LamThem_Select')
        if (res.data) {
            return res.data
        } else {
            return []
        }
    },
    ChinhSach_LamThem_Insert: async (params) => {
        // @NhomChinhSach_LamThem_Id INT,
        // @TenChinhSach_LamThem NVARCHAR(500),
        // @MaChinhSach_LamThem VARCHAR(100),
        // @HeSo NUMERIC(18, 2),
        // @MoTa NVARCHAR(500),
        // @Is_TamKhoa BIT
        const res = await apiUtilWork.OT('ChinhSach_LamThem_Insert', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
    ChinhSach_LamThem_Update: async (params) => {
        //     @ChinhSach_LamThem_Id INT,
        // @NhomChinhSach_LamThem_Id INT,
        // @MaChinhSach_LamThem VARCHAR(100),
        // @TenChinhSach_LamThem NVARCHAR(500),
        // @HeSo NUMERIC(18, 2),
        // @MoTa NVARCHAR(500),
        // @Is_TamKhoa BIT
        const res = await apiUtilWork.OT('ChinhSach_LamThem_Update', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
    ChinhSach_LamThem_Delete: async (params) => {
        // @ChinhSach_LamThem_Id INT,
        const res = await apiUtilWork.OT('ChinhSach_LamThem_Delete', params)
        if (res) {
            return true
        } else {
            return false
        }
    },

}

const boPhanService = {
    BoPhan_Select: async () => {
        const res = await apiUtilWork.AC('BoPhan_Select')
        if (res.data) {
            return res.data
        } else {
            return []
        }
    },
    BoPhan_Insert: async (params) => {
        // @TenBoPhan NVARCHAR(200),
        // @MoTa NVARCHAR(500),
        // @Is_TamKhoa BIT
        const res = await apiUtilWork.AC('BoPhan_Insert', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
    BoPhan_Update: async (params) => {
        //     @BoPhan_Id INT,
        // @MaBoPhan NVARCHAR(50),
        // @TenBoPhan NVARCHAR(200),
        // @MoTa NVARCHAR(500),
        // @Is_TamKhoa BIT
        const res = await apiUtilWork.AC('BoPhan_Update', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
    BoPhan_Delete: async (params) => {
        // @@BoPhan_Id
        const res = await apiUtilWork.AC('BoPhan_Delete', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
    BoPhan_Select_NhanVien: async (params) => {
        const res = await apiUtilWork.AC('BoPhan_Select_NhanVien', params)
        if (res) {
            return res.data
        }
    },
    BoPhan_Insert_NhanVien: async (params) => {
        // @BoPhan_Id INT,
        // @NhanVien_Id INT
        const res = await apiUtilWork.AC('BoPhan_Insert_NhanVien', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
    BoPhan_Delete_NhanVien: async (params) => {
        // @NhanVien_Id INT
        const res = await apiUtilWork.AC('BoPhan_Delete_NhanVien', params)
        if (res) {
            return true
        } else {
            return false
        }
    },
}

const quyenService = {
    Quyen_Select: async () => {
        const res = await apiUtilWork.AC('Quyen_Select')
        if (res.data) {
            return res.data
        } else {
            return []
        }
    },
    BoPhan_Quyen_Select_By_BoPhan_Id: async (params) => {
        const res = await apiUtilWork.AC('BoPhan_Quyen_Select_By_BoPhan_Id', params)
        // @BoPhan_Id INT
        if (res.data) {
            return res.data
        } else {
            return []
        }
    },
    BoPhan_Quyen_Update: async (params) => {
        const res = await apiUtilWork.AC('BoPhan_Quyen_Update', params)
        //     @BoPhan_Id INT,
        // @Quyen_Id_List NVARCHAR(MAX) -- '1,4,5,2'
        if (res) {
            return true
        } else {
            return false
        }
    },
}


const thueService = {
    ChinhSach_Thue_Select: async () => {
        const reps = await apiUtilWork.HR('ChinhSach_Thue_Select')
        if (reps.data)
            return reps.data
        return []
    },
    ChinhSach_Thue_Insert: async (param) => {
        const reps = await apiUtilWork.HR('ChinhSach_Thue_Insert', param)
        if (reps)
            return true
        return false
    },
    ChinhSach_Thue_Delete: async (param) => {
        const reps = await apiUtilWork.HR('ChinhSach_Thue_Delete', param)
        if (reps)
            return true
        return false
    },
    ChinhSach_Thue_Update: async (param) => {
        const reps = await apiUtilWork.HR('ChinhSach_Thue_Update', param)
        if (reps)
            return true
        return false
    },
}

const nhanVienThueService = {
    NhanVien_ChinhSach_Thue_Select: async () => {
        const reps = await apiUtilWork.HR('NhanVien_ChinhSach_Thue_Select')
        if (reps.data)
            return reps.data
        return []
    },
    NhanVien_ChinhSach_Thue_Insert: async (param) => {
        const reps = await apiUtilWork.HR('NhanVien_ChinhSach_Thue_Insert', param)
        if (reps)
            return true
        return false
    },
    NhanVien_ChinhSach_Thue_Delete: async (param) => {
        const reps = await apiUtilWork.HR('NhanVien_ChinhSach_Thue_Delete', param)
        if (reps)
            return true
        return false
    },
    NhanVien_ChinhSach_Thue_Update: async (param) => {
        const reps = await apiUtilWork.HR('NhanVien_ChinhSach_Thue_Update', param)
        if (reps)
            return true
        return false
    },
}

const loaiHopDongService = {
    LoaiHopHong_Select: async () => {
        const reps = await apiUtilWork.HR('LoaiHopDong_Select')
        if (reps.data)
            return reps.data
        return []
    },
    LoaiHopDong_Insert: async (param) => {
        const reps = await apiUtilWork.HR('LoaiHopDong_Insert', param)
        if (reps)
            return true
        return false
    },
    LoaiHopDong_Delete: async (param) => {
        const reps = await apiUtilWork.HR('LoaiHopDong_Delete', param)
        if (reps)
            return true
        return false
    },
    LoaiHopDong_Update: async (param) => {
        const reps = await apiUtilWork.HR('LoaiHopDong_Update', param)
        if (reps)
            return true
        return false
    },
}

const lyDoNghiViecService = {
    LyDoNghiViec_Select: async () => {
        const reps = await apiUtilWork.HR('LyDoNghiViec_Select')
        if (reps.data)
            return reps.data
        return []
    },
    LyDoNghiViec_Insert: async (param) => {
        const reps = await apiUtilWork.HR('LyDoNghiViec_Insert', param)
        if (reps)
            return true
        return false
    },
    LyDoNghiViec_Delete: async (param) => {
        const reps = await apiUtilWork.HR('LyDoNghiViec_Delete', param)
        if (reps)
            return true
    },
    LyDoNghiViec_Update: async (param) => {
        const reps = await apiUtilWork.HR('LyDoNghiViec_Update', param)
        if (reps)
            return true
        return false
    }
}

const chinhSachNhanSuService = {
    LoaiChinhSach_NhanSu_Select: async () => {
        const reps = await apiUtilWork.HR('LoaiChinhSach_NhanSu_Select')
        if (reps.data)
            return reps.data
        return []
    },
    ChinhSach_NhanSu_Insert: async (param) => {
        const reps = await apiUtilWork.HR('ChinhSach_NhanSu_Insert', param)
        if (reps)
            return true
        return false
    },
    ChinhSach_NhanSu_Delete: async (param) => {
        const reps = await apiUtilWork.HR('ChinhSach_NhanSu_Delete', param)
        if (reps)
            return true
        return false
    },
    ChinhSach_NhanSu_Select: async () => {
        const reps = await apiUtilWork.HR('ChinhSach_NhanSu_Select')
        if (reps.data)
            return reps.data
        return []
    },
    ChinhSach_NhanSu_Update: async (param) => {
        const reps = await apiUtilWork.HR('ChinhSach_NhanSu_Update', param)
        if (reps)
            return true
    },
}