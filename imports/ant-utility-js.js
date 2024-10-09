const propsDefaultTable = {
    columns: {
        type: Array,
        default: [],
        required: true,
    },
    pagination: {
        type: Object,
        default: {
            current: 1,
            pageSize: 25,
            showTotal: (total, range) => `${range[0]} - ${range[1]} / ${total} mục`,
        },
        required: true,
    },
    dataSource: {
        type: Array,
        default: [],
        required: true,
    },
    scrollTable: {
        type: Object,
        default: { x: 'max-content', y: 'calc(100vh - 179px)' },
    },
    handletablechange: {
        type: Function,
        required: true,
    },
}

const FORMAT_DATE = 'DD/MM/YYYY'
const FORMAT_HOUR = 'HH:mm:ss'
const ROW_GUTTER = [16, 16]

const actionRowTable = {
    title: '',
    dataIndex: 'actions',
    scopedSlots: { customRender: 'actions' },
}

const scrollToDate = (DSNgay) => {
    const currentDate = new Date()
    const date = currentDate.getDate()
    const month = currentDate.getMonth() + 1
    let left = 0
    let x = null
    let y = null

    let isScroll = false
    for (var day of DSNgay) {
        if (day.Ngay === date && day.Thang === month) {
            x = day.Cot_Ngay
            y = day.Thu_So + '_' + day.Ngay
            isScroll = true
            break
        }
        left += 110
    }

    if (isScroll) {
        setTimeout(() => {
            $('.ant-table-body').animate({ scrollLeft: left }, 400);
            const items = $(`[id*=${y}]`).parent()
            for (var i = 0; i < items.length; i++) {
                const element = items[i]
                var elem = document.createElement('div');
                elem.classList.add('line-now-day')

                element.style.position = "relative"
                element.appendChild(elem);

            }
        }, 100)
    } else {
        setTimeout(() => {
            $('.ant-table-body').animate({ scrollLeft: 0 }, 400);
            $('.line-now-day').remove();
        }, 100)
    }
}

const propsSettingHandsonTable = {
    height: 'auto',
    maxHeight: '50vh',
    autoWrapRow: true,
    autoWrapCol: true,
    // manualRowMove: true,
    // manualRowResize: true,
    colHeaders: true,
    rowHeaders: true,
    contextMenu: true,
}

const getPagination = (pagination) => {
    const newPag = {
        ...pagination,
        current: pagination.PageIndex,
        pageSize: pagination.PageSize,
        total: pagination.TotalRow,
        totalRow: pagination.TotalRow,
        totalPage: pagination.TotalPage,
        showTotal: (total, range) => `${range[0]} - ${range[1]} / ${total} mục`,
    }
    return newPag
}

const getPaginationDeXuat = (pagination) => {
    console.log(pagination)
    const newPag = {
        current: pagination.PageIndex,
        pageSize: pagination.PageSize,
        total: pagination.TotalRow,
        totalRow: pagination.TotalRow,
        totalPage: pagination.TotalPage,
        showTotal: (total, range) => `${range[0]} - ${range[1]} / ${total} mục`,
    }
    return newPag
}

const propsModalConfirm = {
    okButtonProps: {
        id: 'okButtonAction',
        // icon: "save",
    },
    cancelButtonProps: {
        id: 'closeButtonAction',
        // icon: "close",
    },
    cancelText: 'Đóng',
}

const Confirm = {
    delete: ({ content = '', okType = 'danger', onOk, onCancel }) => {
        const okButton = document.getElementById('okButton')

        const { Modal } = this.antd
        Modal.confirm({
            ...propsModalConfirm,
            title: 'Thông báo',
            content: content,
            okText: "Xóa",
            okType: okType,
            onOk() {
                onOk && onOk()
            },
            onCancel() {
                onCancel && onCancel()
            },
        })
    },
    confirm: ({ content = '', okType = 'primary', onOk, onCancel }) => {
        const { Modal } = this.antd
        Modal.confirm({
            ...propsModalConfirm,
            title: 'Thông báo',
            content: content,
            okText: 'Xác nhận',
            okType: okType,
            onOk() {
                onOk && onOk()
            },
            onCancel() {
                onCancel && onCancel()
            },
        })
    },
    warning: ({ content = '', onCancel }) => {
        const { Modal } = this.antd
        Modal.warning({
            ...propsModalConfirm,
            title: 'Thông báo',
            content: content,
            okText: 'Đóng',
            onCancel() {
                onCancel && onCancel()
            },
        })
    },
}

const RULE_VALIDATE = {
    CODE: [
        { required: true, message: 'Vui lòng nhập mã', trigger: 'change' },
        { pattern: /^[a-zA-Z0-9]+([-]?[a-zA-Z0-9])*$/, message: 'Mã không được chứa ký tự đặc biệt' },
    ],
    EMAIL: [],
}
