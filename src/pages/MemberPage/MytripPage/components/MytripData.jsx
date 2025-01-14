import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import moment from 'moment';

function MytripData() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [schedules, setSchedules] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [showCheckboxes, setShowCheckboxes] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (!token) {
            alert("請先登入");
            navigate("/");
            return;
        }

        const page = parseInt(searchParams.get("page")) || 1;
        setCurrentPage(page);

        axios
            .get(`http://localhost:8080/member/planList/${page}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                setSchedules(response.data.data);
                setLastPage(response.data.lastPage);
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    alert("登入已過期，請重新登入");
                    setToken(localStorage.removeItem('token'));
                    window.location.href = '/';
                } else {
                    alert(`無法讀取會員資料: ${error.message}`);
                }
            });
    }, [searchParams, token]);

    // 刪除行程
    const handleDelete = (e) => {
        e.preventDefault();
        if (selectedIds.length === 0) {
            alert("請選擇要刪除的行程！");
            return;
        }

        if (!window.confirm("確定要刪除?")) return;

        const ids = selectedIds.join(",");
        axios
            .delete(`http://localhost:8080/member/delPlanList/${ids}`)
            .then(() => {
                alert("行程刪除成功！");
                window.location.reload();
            })
            .catch((error) => {
                console.error("刪除行程失敗:", error);
                alert("刪除行程失敗！");
            });
    };

    // 勾選框 Checkbox
    const toggleCheckbox = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    // 頁碼按鈕
    const renderPagination = () => {
        const pages = [];
        for (let i = 1; i <= lastPage; i++) {
            pages.push(
                <li key={i} className={i === currentPage ? "active" : ""}>
                    {i === currentPage ? (
                        <span>{i}</span>
                    ) : (
                        <a href={`?page=${i}`}>{i}</a>
                    )}
                </li>
            );
        }
        return pages;
    };

    return (
        <>
            <div className="text-end mb-3">
                <a href="/BuildPlan" className="btn btn-primary editbtn text-white">
                    新增行程 <b>＋</b>
                </a>
                {schedules.length > 0 && (
                    <button
                        id="deletebtn"
                        className="btn btn-primary ms-1 editbtn text-white"
                        onClick={() => setShowCheckboxes(true)}
                    >
                        刪除行程 <b>－</b>
                    </button>
                )}
            </div>

            {schedules.length === 0 ? (
                <div className="alert alert-info" role="alert">
                    目前沒有任何的行程。
                </div>
            ) : (
                <form>
                    {schedules.map((schedule) => {
                        const startDate = moment(schedule.edit_date).format('YYYY-MM-DD');
                        const endDate = moment(schedule.end_date).format('YYYY-MM-DD');

                        return (
                            <div
                                key={schedule.sch_id}
                                className="checkcard animate__animated animate__zoomIn mb-5"
                            >
                                {showCheckboxes && (
                                    <label className="checkbox">
                                        <input
                                            type="checkbox"
                                            value={schedule.sch_id}
                                            checked={selectedIds.includes(schedule.sch_id)}
                                            onChange={() => toggleCheckbox(schedule.sch_id)}
                                        />
                                        <span></span>
                                    </label>
                                )}
                                <div
                                    className="card"
                                    onClick={() => {
                                        if (!showCheckboxes) {
                                            localStorage.setItem("scheduleId", schedule.sch_id);
                                            navigate("/editPlan");
                                        }
                                    }}
                                >
                                    <div className="row align-items-center">
                                        <div className="col-md-4">
                                            <img
                                                src={`/public/images/searchSite/${schedule.photo_one}`}
                                                className="img-fluid"
                                                alt="行程圖片"
                                            />
                                        </div>
                                        <div className="col-md-8 text-center">
                                            <div className="card-body">
                                                <p className="card-text title ms-2">
                                                    {schedule.sch_name}
                                                </p>
                                                <p className="card-text">
                                                    <span className="text-body-secondary">
                                                        行程期間：{startDate} - {endDate}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    <div className="jumpbox mb-3">
                        <ul className="jump_bef">
                            <li>
                                <a
                                    href="?page=1"
                                    title="第一頁"
                                    className={currentPage === 1 ? "disabled" : ""}
                                >
                                    <i className="icon-chevrons-left"></i>
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`?page=${currentPage - 1}`}
                                    title="上一頁"
                                    className={currentPage === 1 ? "disabled" : ""}
                                >
                                    <i className="icon-chevron-left"></i>
                                </a>
                            </li>
                        </ul>
                        <ul className="jump_btn">{renderPagination()}</ul>
                        <ul className="jump_aft">
                            <li>
                                <a
                                    href={`?page=${currentPage + 1}`}
                                    title="下一頁"
                                    className={currentPage === lastPage ? "disabled" : ""}
                                >
                                    <i className="icon-chevron-right"></i>
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`?page=${lastPage}`}
                                    title="最後一頁"
                                    className={currentPage === lastPage ? "disabled" : ""}
                                >
                                    <i className="icon-chevrons-right"></i>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {showCheckboxes && (
                        <div id="choose" className="text-end">
                            <button
                                id="delbtn"
                                className="btn footerbtn text-white"
                                onClick={handleDelete}
                            >
                                確定刪除
                            </button>
                            <button
                                id="cancelbtn"
                                className="btn ms-1 footerbtn text-white"
                                onClick={() => setShowCheckboxes(false)}
                            >
                                取消
                            </button>
                        </div>
                    )}
                </form>
            )}
        </>
    );
}

export default MytripData;