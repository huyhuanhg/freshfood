import {Button, Divider, Space, Table, Tag} from "antd";
import {DeleteOutlined, EditOutlined, EyeOutlined, SettingOutlined} from "@ant-design/icons";
import * as Style from '../../../styles';

function CategoryPage(props) {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: text => <b>{text}</b>,
        },
        {
            title: 'Danh mục',
            dataIndex: 'category_name',
            key: 'category_name',
            render: text => <b>{text}</b>,
        },
        {
            title: 'Số món ăn',
            dataIndex: 'food_total',
            key: 'food_total',
        },
        {
            title: 'Mô tả',
            dataIndex: 'category_description',
            key: 'category_description',
        },
        {
            title: 'Tình trạng',
            key: 'category_active',
            dataIndex: 'category_active',
            render: active => (
                <span>
                <Tag color={active ? 'green' : 'volcano'}>
                    {active ? 'Hoạt động' : 'Ngừng hoạt động'}
                </Tag>
      </span>
            ),
        },
        {
            key: 'action',
            render: (text, record) => (
                <>
                    {/*<Button>*/}
                    {/*    <EyeOutlined/>*/}
                    {/*</Button>*/}
                    <Style.Icon type='edit'>
                        <EditOutlined/>
                    </Style.Icon>
                    <Style.Icon type='destroy'>
                        <DeleteOutlined/>
                    </Style.Icon>
                </>
            ),
        },
    ];
    const data = [
        {
            id: 1,
            key: '1',
            category_name: 'Thực phẩm',
            food_total: 32,
            category_description: 'Thực phẩm hàng ngày',
            category_active: 1,
        },
        {
            id: 2,
            key: '2',
            category_name: 'Đồ uống',
            food_total: 42,
            category_description: 'Đồ uống',
            category_active: 0,
        },
        {
            id: 3,
            key: '3',
            category_name: 'Thức ăn nhanh',
            food_total: 32,
            category_description: 'Thức ăn nhanh',
            category_active: 1,
        },
    ]

    return (
        <>
            <div style={{display: "flex", justifyContent: 'space-between', alignItems: "center"}}>
                <h5 style={{
                    fontWeight: 'bold',
                    lineHeight: 1.5,
                    fontSize: '18px',
                }}>Quản lý danh mục</h5>
                <Button type='primary'>Thêm danh mục</Button>
            </div>
            <Table bordered={true} columns={columns} dataSource={data} pagination={false} style={{marginTop: '10px'}}/>
        </>
    );
}

export default CategoryPage;