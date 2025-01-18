import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileEdit from './ProfileEdit';
import ProfileView from './ProfileView';

const ProfileData = () => {
    const [member, setMember] = useState({});
    const [editing, setEditing] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [formData, setFormData] = useState({});
    const [imagePreview, setImagePreview] = useState();
    const [uphotoValue, setUphotovalue] = useState('');

    useEffect(() => {
        if (!token) {
            alert("請先登入");
            window.location.href = '/';
            return;
        }

        axios.get('http://localhost:8080/member/members', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setMember(response.data);
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    alert('登入已過期，請重新登入');
                    setToken(localStorage.removeItem('token'));
                    window.location.href = '/';
                } else {
                    alert('無法讀取會員資料:' + error.message);
                }
            });
    }, [token]);

    // 一開始的圖片
    useEffect(() => {
        if (member.uphoto) {
            setImagePreview(`/images/memberimg/${member.uphoto}`);
        }
    }, [member]);

    // 處理上傳圖片
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const readFile = new FileReader();

            readFile.onload = () => {
                const imageUrl = readFile.result;
                setImagePreview(imageUrl);
            };

            readFile.readAsDataURL(file);

            setUphotovalue(file.name);
        }
    };

    // 傳入更新表單資料
    const handleUpdateFormData = (updatedFormData) => {
        setFormData(updatedFormData);
    };

    // 進入編輯
    const handleEdit = (e) => {
        e.preventDefault();
        setEditing(true);
    };

    // 取消編輯
    const handleCancel = () => {
        if (window.confirm('確定取消編輯?')) {
            setEditing(false);
            setFormData({ ...member });
            setImagePreview(member.uphoto ? `/images/memberimg/${member.uphoto}` : null);
        }
    };

    // 儲存資料
    const handleSave = async (e) => {
        e.preventDefault();
        let msg = "確定儲存?";
        if (!confirm(msg)) return false;

        const form = document.getElementById('form');

        if (!form.checkValidity()) {
            form.reportValidity(); // 顯示瀏覽器的驗證錯誤
            return;
        }

        const updatedFormData = new FormData();

        // 將 formData 的內容加入到 FormData 中
        for (const key in formData) {
            updatedFormData.append(key, formData[key]);
        }

        // 如果有選擇檔案，則將檔案加入 FormData
        if (uphotoValue) {
            const file = document.querySelector('input[name="uphoto"]').files[0]; // 取得 input[type="file"] 中的檔案
            if (file) {
                updatedFormData.append('uphoto', file);  // 將檔案加入 FormData 中
            }
        }

        // 處理儲存邏輯
        axios.post('http://localhost:8080/member/update', updatedFormData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                if (response.data) {
                    alert(response.data.message);
                    window.location.href = "/profile";
                }
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    alert(error.response.data.message); // 顯示後端返回的錯誤消息
                } else {
                    alert('更新失敗，請稍後再試。');
                }
            });
    };

    // Google 按鈕
    useEffect(() => {
        window.onload = function () {
            google.accounts.id.initialize({
                client_id: "745588392722-ldt3hokig9ll3mk6nekm1qmj9apnipo5.apps.googleusercontent.com",
                callback: handleCallback
            });
            google.accounts.id.renderButton(
                document.getElementById("google"),
                { type: "icon" }
            );
            google.accounts.id.prompt();
        }
    }, []);

    // Google 登入解碼
    const parseJwt = (token) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    };

    // Google 綁定
    const handleCallback = async (response) => {
        const data = await parseJwt(response.credential);
        await axios.post("http://localhost:8080/member/GoogleBind", { data }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            alert(response.data.message);
            location.reload(); // 成功後重新載入頁面
        })
            .catch(error => {
                console.error("綁定失敗:", error);
                alert(error.response.data.message);
            });
    }

    // 解除 Google 綁定
    const UnbindGoogle = async () => {
        await axios.post("http://localhost:8080/member/delGoogleid", {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            if (response.data) {
                alert(response.data.message);
                location.reload();
            }
        }).catch(error => {
            console.error("解除失敗:", error);
            alert(error.response.data.message);
        });
    }

    // Line 綁定
    const handleLineLogin = () => {
        const client_id = '2006514534';
        const redirect_uri = 'http://localhost:5173/profile';
        let link = 'https://access.line.me/oauth2/v2.1/authorize?';
        link += 'response_type=code';
        link += '&client_id=' + client_id;
        link += '&redirect_uri=' + redirect_uri;
        link += '&state=login';
        link += '&scope=profile%20openid%20email';
        window.location.href = link;
    };

    // Line 資料傳入後台做綁定
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        if (code) {
            axios.post("http://localhost:8080/member/LineBind", { code }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                if (response.data) {
                    alert(response.data.message);
                    window.location.href = "/profile";
                }
            }).catch(error => {
                console.error("綁定失敗:", error);
                alert(error.response.data.message);
            });
        }
    }, []);

    // 解除 Line 綁定
    const UnbindLine = async () => {
        await axios.post("http://localhost:8080/member/delLineid", {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            if (response.data) {
                alert(response.data.message);
                location.reload();
            }
        }).catch(error => {
            console.error("解除失敗:", error);
            alert(error.response.data.message);
        });
    }

    return (
        <>
            <form id="form">
                {/* 根據 editing 狀態來顯示不同的元件 */}
                {editing ? (
                    // 編輯模式的元件
                    <>
                        <div id="write" className="text-end mb-3">
                            <button type="submit" className="btn btn-secondary storebtn text-white" onClick={handleSave}>
                                儲存
                            </button>
                            <button type="button" className="btn btn-secondary ms-1 cancelbtn text-white" onClick={handleCancel}>
                                取消
                            </button>
                        </div>
                        <div className="photocard mb-5">
                            <div className="card" style={{ maxWidth: '600px' }}>
                                <div className="row align-items-center g-0">
                                    <div className="col-md-4 col-sm-12 d-flex justify-content-center">
                                        <div id="photo" className="d-flex justify-content-center align-items-center">
                                            {member.uphoto ?
                                                <>
                                                    <label className="btn btn-info upload">
                                                        <input type="file" name="uphoto" id="uphoto" onChange={handleFileChange} />
                                                        <i className="fa-regular fa-image"></i> 檔案上傳
                                                    </label>
                                                    <img id="img" src={imagePreview} />
                                                </>
                                                : <p>請上傳圖片</p>}
                                        </div>
                                    </div>
                                    <div className="col-md-8 col-sm-12">
                                        <div className="card-body">
                                            <p className="card-text ms-2">
                                                歡迎! <span id="uname">{member.uname}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="formList">
                            <ProfileEdit member={member} onUpdateFormData={handleUpdateFormData} />
                            <div className="bindaccount">
                                <div className="title">綁定帳戶：</div>
                                <div className="googleline">
                                    <div className="item">
                                        <img src="/images/memberimg/logo_google_g_icon.png" className="googleimg" />
                                        {member.googleid ? <button type="button" className="btn google" data-bs-toggle="modal" data-bs-target="#googleModal">已綁定</button> : <div id='google'></div>}
                                    </div>
                                    <div className="item">
                                        <img src="/images/memberimg/btn_base.png" className="lineimg" />
                                        <button type="button" id="line" className="btn" data-bs-toggle="modal" data-bs-target={member.lineid ? '#lineModal' : ''} onClick={member.lineid ? undefined : handleLineLogin}>{member.lineid ? '已綁定' : '未綁定'}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    // 顯示模式的元件
                    <>
                        <div id="edit" className="text-end mb-3">
                            <button type="button" className="btn btn-primary editbtn text-white" onClick={handleEdit}>
                                <i className="fa-solid fa-pencil me-1"></i>編輯
                            </button>
                        </div>
                        <div className="photocard mb-5">
                            <div className="card" style={{ maxWidth: '600px' }}>
                                <div className="row align-items-center g-0">
                                    <div className="col-md-4 col-sm-12 d-flex justify-content-center">
                                        <div id="photo" className="d-flex justify-content-center align-items-center">
                                            {member.uphoto ? <img id="img" src={`/images/memberimg/${member.uphoto}`} /> : <p>請上傳圖片</p>}
                                        </div>
                                    </div>
                                    <div className="col-md-8 col-sm-12">
                                        <div className="card-body">
                                            <p className="card-text ms-2">
                                                歡迎! <span id="uname">{member.uname}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="formList">
                            <ProfileView member={member} />
                            <div className="bindaccount">
                                <div className="title">綁定帳戶：</div>
                                <div className="googleline">
                                    <div className="item">
                                        <img src="/images/memberimg/logo_google_g_icon.png" className="googleimg" />
                                        {member.googleid ? <button type="button" className="btn google" data-bs-toggle="modal" data-bs-target="#googleModal">已綁定</button> : <div id='google'></div>}
                                    </div>
                                    <div className="item">
                                        <img src="/images/memberimg/btn_base.png" className="lineimg" />
                                        <button type="button" id="line" className="btn" data-bs-toggle="modal" data-bs-target={member.lineid ? '#lineModal' : ''} onClick={member.lineid ? undefined : handleLineLogin}>{member.lineid ? '已綁定' : '未綁定'}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                <div className="modal fade" id="googleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">解除綁定</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                確定要解除綁定?
                            </div>
                            <div className="modal-footer">
                                <button id="delGoogle" type="button" className="btn btn-primary text-white" onClick={UnbindGoogle}>確定</button>
                                <button type="button" className="btn btn-secondary text-white" data-bs-dismiss="modal">取消</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="lineModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">解除綁定</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                確定要解除綁定?
                            </div>
                            <div className="modal-footer">
                                <button id="delLine" type="button" className="btn btn-primary text-white" onClick={UnbindLine}>確定</button>
                                <button type="button" className="btn btn-secondary text-white" data-bs-dismiss="modal">取消</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form >
        </>
    );
};

export default ProfileData;