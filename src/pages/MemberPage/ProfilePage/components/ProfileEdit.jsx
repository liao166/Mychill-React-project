import React, { useState, useEffect, useRef } from 'react';
import flatpickr from 'flatpickr';
import moment from 'moment';

function ProfileEdit(props) {
    const { member, onUpdateFormData } = props;
    const [inputSizes, setInputSizes] = useState({});
    const inputRefs = useRef([]);
    const [formData, setFormData] = useState({ ...member });

    // input 資料
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // 將更新後的 formData 回傳給父組件
    useEffect(() => {
        onUpdateFormData(formData);
    }, [formData, onUpdateFormData]);

    // 修改生日格式
    const myBirthday = formData.birthday ? moment(formData.birthday).format('YYYY-MM-DD') : '';

    useEffect(() => {
        flatpickr(inputRefs.current[3], {
            allowInput: true,
            dateFormat: 'Y-m-d',
            defaultDate: formData.birthday || 'today',
            onChange: function (_, dateStr) {
                setFormData({ ...formData, birthday: dateStr });
            }
        });
    }, []);

    // 調整 input 長度
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

    // 更新輸入框長度
    useEffect(() => {
        // 新增輸入框樣式
        inputRefs.current.forEach(input => {
            if (input) {
                input.style.border = '1px solid #d2d2d2';
                input.style.outline = 'solid thin';
            }
        });

        // 將焦點設定到第一個輸入框
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }

        const sizes = {
            uname: calculateSize(member.uname),
            email: calculateSize(member.email || '未填寫'),
            password: calculateSize(member.password || '未填寫'),
            birthday: calculateSize(myBirthday || '未填寫'),
            address: calculateSize(member.address || '未填寫'),
            cellphone: calculateSize(member.cellphone || '未填寫'),
            telephone: calculateSize(member.telephone || '未填寫')
        };
        setInputSizes(sizes);
    }, [member]);

    return (
        <>
            <div className="item row">
                <div className="col-12">
                    <label className="col-form-label">姓名：</label>
                    <input type="text" name="uname" id="uname1" className="inpwrite" value={formData.uname} size={inputSizes.uname} placeholder="請輸入姓名" onChange={handleInputChange} ref={el => inputRefs.current[0] = el} />
                </div>
            </div>
            <div className="item row">
                <div className="col-md-6 col-sm-12">
                    <label className="col-form-label">電子信箱：</label>
                    <input type="email" name="email" id="email" className="inpwrite" value={formData.email} size={inputSizes.email} placeholder="請輸入電子信箱" onChange={handleInputChange} ref={el => inputRefs.current[1] = el} />
                </div>
                <div className="col-md-6 col-sm-12">
                    <label className="col-form-label">密碼：</label>
                    <input type="text" name="password" id="password" className="inpwrite" value={formData.password} minLength="6" size={inputSizes.password} placeholder="請輸入密碼" onChange={handleInputChange} ref={el => inputRefs.current[2] = el} />
                </div>
            </div>
            <div className="item row">
                <div className="col-md-6 col-sm-12">
                    <label className="col-form-label">出生日期：</label>
                    <input type="text" name="birthday" id="birthday" className="inpwrite" size={inputSizes.birthday} placeholder="請輸入出生日期" onChange={handleInputChange} ref={el => inputRefs.current[3] = el} />
                </div>
                <div className="col-md-6 col-sm-12">
                    <label className="col-form-label">性別：</label>
                    <>
                        <input type="radio" name="sex" id="boy" value="男" checked={formData.sex === '男'} onChange={() => handleInputChange({ target: { name: 'sex', value: '男' } })} />
                        <label className="col-form-label ms-1 me-2" htmlFor="boy">
                            男
                        </label>
                        <input type="radio" name="sex" id="girl" value="女" checked={formData.sex === '女'} onChange={() => handleInputChange({ target: { name: 'sex', value: '女' } })} />
                        <label className="col-form-label ms-1" htmlFor="girl">
                            女
                        </label>
                    </>
                </div>
            </div>
            <div className="item row align-items-center">
                <div className="col-12">
                    <label className="col-form-label">住址：</label>
                    <input type="text" name="address" id="address" className="inpwrite" value={formData.address} size={inputSizes.address} placeholder="請輸入住址" onChange={handleInputChange} ref={el => inputRefs.current[4] = el} />
                </div>
            </div>
            <div className="item row">
                <div className="col-12">
                    <label className="col-form-label">手機號碼：</label>
                    <input type="text" name="cellphone" id="cellphone" className="inpwrite" value={formData.cellphone}
                        size={inputSizes.cellphone} placeholder="請輸入手機號碼" pattern="09[0-9]{8}" onChange={handleInputChange} ref={el => inputRefs.current[5] = el} />
                </div>
            </div>
            <div className="item row">
                <div className="col-12">
                    <label className="col-form-label">市內電話：</label>
                    <input type="text" name="telephone" id="telephone" className="inpwrite" value={formData.telephone}
                        size={inputSizes.telephone} placeholder="請輸入市內電話" pattern="0[2-8]{1}[0-9]{8}" onChange={handleInputChange} ref={el => inputRefs.current[6] = el} />
                </div>
            </div>
        </>
    )
}

export default ProfileEdit;