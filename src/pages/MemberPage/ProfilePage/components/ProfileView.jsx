import React, { useState, useEffect } from 'react';
import moment from 'moment';

function ProfileView(props) {
    const { member } = props;
    const [showPassword, setShowPassword] = useState(false); // 新增狀態
    const [inputSize, setInputSize] = useState('');

    // 修改生日格式
    const myBirthday = member.birthday ? moment(member.birthday).format('YYYY-MM-DD')  : '未填寫';

    // 開關密碼顯示
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // 調整 input 長度
    useEffect(() => {
        const calculateSize = (value) => {
            let size = 0;
            for (let i = 0; i < value.length; i++) {
                const charCode = value.charCodeAt(i);
                if (charCode >= 0x4e00 && charCode <= 0x9fff) {
                    size += 2; // 中文字符加2
                } else {
                    size += 1; // 非中文字符加1
                }
            }
            return size;
        };

        setInputSize(calculateSize(member.password || '未填寫'));
    }, [member.password]);

    return (
        <>
            <div className="item row">
                <div className="col-12">
                    <label className="col-form-label">姓名：</label>
                    {member.uname}
                </div>
            </div>
            <div className="item row">
                <div className="col-md-6 col-sm-12">
                    <label className="col-form-label">電子信箱：</label>
                    {member.email || '未填寫'}
                </div>
                <div className="col-md-6 col-sm-12">
                    <label className="col-form-label">密碼：</label>
                    <input type={member.password ? `${showPassword ? "text" : "password"}` : "text"} name="pwd" id="pwd" className="inpwrite" value={member.password || '未填寫'} minLength="6" size={inputSize} placeholder="請輸入密碼" readOnly />
                    {member.password ? <i
                        className={`fa-solid ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}
                        onClick={togglePasswordVisibility}
                        style={{ cursor: 'pointer' }}
                    ></i> : ''}
                </div>
            </div>
            <div className="item row">
                <div className="col-md-6 col-sm-12">
                    <label className="col-form-label">出生日期：</label>
                    {myBirthday}
                </div>
                <div className="col-md-6 col-sm-12">
                    <label className="col-form-label">性別：</label>
                    {member.sex || '未填寫'}
                </div>
            </div>
            <div className="item row align-items-center">
                <div className="col-12">
                    <label className="col-form-label">住址：</label>
                    {member.address || '未填寫'}
                </div>
            </div>
            <div className="item row">
                <div className="col-12">
                    <label className="col-form-label">手機號碼：</label>
                    {member.cellphone || '未填寫'}
                </div>
            </div>
            <div className="item row">
                <div className="col-12">
                    <label className="col-form-label">市內電話：</label>
                    {member.telephone || '未填寫'}
                </div>
            </div>
        </>
    )
}

export default ProfileView;