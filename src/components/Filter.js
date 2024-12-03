import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGroupBy, setSortBy } from '../redux/slices/filterSlice';

const Filter = ({ showTooltip, setShowTooltip, tooltipRef }) => {
  const dispatch = useDispatch();
  const groupBy = useSelector((state) => state.filters.groupBy);
  const sortBy = useSelector((state) => state.filters.sortBy);

  const handleDisplayClick = () => {
    setShowTooltip(!showTooltip);
  };

  return (
    <div className="filters">
      <button onClick={handleDisplayClick} style={{ display: 'flex', alignItems: 'center' }} className="display-button">
        <img
          style={{
            marginRight: '0.5rem',
            width: '0.8rem',
            height: '0.8rem',
            display: 'inline-block',
          }}
          src={`assets/display.svg`}
          alt="Display"
        />
        Display
        <img
          style={{
            marginLeft: '0.2rem',
            width: '0.9rem',
            height: '0.9rem',
            display: 'inline-block',
          }}
          src={`assets/down.svg`}
          alt="Expand"
        />
      </button>
      {showTooltip && (
        <div className="tooltip" ref={tooltipRef}>
          <div className='flex' style={{ width: '12rem', marginBottom: '8px' }}>
            <span className='greyish' style={{ fontWeight: '700', fontSize: '0.8rem' }}>Grouping </span>
            <select onChange={(e) => dispatch(setGroupBy(e.target.value))} value={groupBy}>
              <option value="status">Status</option>
              <option value="userId">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className='flex' style={{ width: '12rem' }}>
            <span className='greyish' style={{ fontWeight: '700', fontSize: '0.8rem' }}>Sorting </span>
            <select onChange={(e) => dispatch(setSortBy(e.target.value))} value={sortBy}>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
