import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddSiteModal = ({ show, onClose, emailId, token }) => {
  const [schedules, setSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState('');
  const [siteData, setSiteData] = useState(null);

  useEffect(() => {
    if (show && emailId) {
      fetchSchedules();
    }
  }, [show, emailId]);

  const fetchSchedules = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/schInfo/getspot/${emailId}`);
      setSchedules(data.schedules);
    } catch (error) {
      console.error('獲取行程資料失敗', error);
    }
  };

  const handleScheduleChange = (e) => {
    const selected = schedules.find(schedule => schedule.sch_name === e.target.value);
    setSelectedSchedule(selected);
    if (selected) {
      const dayOptions = Array.from({ length: Number(selected.days) + 1 }, (_, i) => i + 1);
      setDays(dayOptions);
    } else {
      setDays([]);
    }
  };

  const handleSave = async () => {
    if (!selectedSchedule || !selectedDay || !siteData) {
      alert('請完整選擇行程及天數');
      return;
    }

    const dataToSave = {
      sch_id: selectedSchedule.sch_id,
      sch_day: selectedDay,
      sch_order: "1",
      sch_spot: siteData.site_name,
      sch_info: siteData.site_info,
      sch_img: siteData.site_img,
    };

    try {
      await axios.post('http://localhost:8080/schInfo/getspot/add', dataToSave);
      alert('行程保存成功');
      onClose();
    } catch (error) {
      alert('保存行程失敗');
      console.error('保存行程失敗', error);
    }
  };

  return (
    <div className={`modal fade ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">選擇行程</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="itinerarySelect" className="form-label">選擇行程</label>
              <select className="form-select" id="itinerarySelect" onChange={handleScheduleChange}>
                <option value="">請選擇行程</option>
                {schedules.map(schedule => (
                  <option key={schedule.sch_id} value={schedule.sch_name}>
                    {schedule.sch_name}
                  </option>
                ))}
              </select>
            </div>
            {days.length > 0 && (
              <div className="mb-3">
                <label htmlFor="daySelect" className="form-label">選擇天數</label>
                <select
                  className="form-select"
                  id="daySelect"
                  onChange={(e) => setSelectedDay(e.target.value)}
                >
                  <option value="">請選擇天數</option>
                  {days.map(day => (
                    <option key={day} value={day}>
                      第 {day} 天
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>關閉</button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>保存選擇</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSiteModal;
