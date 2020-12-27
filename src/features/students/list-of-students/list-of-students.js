import React, { useState, useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { paths, useActions } from '@/shared/index.js';
import {
  Card, Search, Button, WithLoading,
} from '@/components/index.js';
import Icon from '@/icon.js';
import {
  loadActiveStudents, activeStudentsSelector,
} from '@/models/index.js';

export const ListOfStudents = () => {
  const [fetchStudents] = useActions([loadActiveStudents]);

  const [filteredStudentsList, setFilteredStudentsList] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const { data, isLoading } = useSelector(activeStudentsSelector, shallowEqual);

  const history = useHistory();

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  useEffect(() => {
    setFilteredStudentsList(data);
  }, [data]);

  const handleSearch = (inputValue) => {
    setSearchValue(inputValue);
    setFilteredStudentsList(data.filter(({ firstName, lastName }) => {
      const name = `${firstName} ${lastName}`;

      return name.toLowerCase().includes(inputValue.toLowerCase());
    }));
  };

  const addStudent = () => {
    history.push(paths.UNASSIGNED_USERS);
  };

  const studentDetails = (id) => {
    history.push(`${paths.STUDENTS_DETAILS}/${id}`);
  };

  const studentEditing = (id) => {
    history.push(`${paths.STUDENT_EDIT}/${id}`);
  };

  const getStudents = () => {
    const students = filteredStudentsList.map(({ id, firstName, lastName }) => (
      <Card
        key={id}
        id={id}
        buttonName="Details"
        iconName="Edit"
        onEdit={() => studentEditing(id)}
        onDetails={() => studentDetails(id)}
      >
        <div className="w-75">
          <span className="mb-2  pr-2">{firstName}</span>
          <span>{lastName}</span>
        </div>
      </Card>
    ));

    if (!students.length && searchValue) {
      return <h4>Student is not found</h4>;
    }

    return students;
  };

  return (
    <div className="container mb-2">
      <div className="row">
        <div className="col-md-4 offset-md-4 col-12 text-center">
          <Search onSearch={handleSearch} placeholder="Student's name" />
        </div>
        <div className="col-md-4 col-12 text-right">
          <Button onClick={addStudent} variant="warning">
            <Icon icon="Plus" className="icon" />
            <span>Add a student</span>
          </Button>
        </div>
      </div>
      <div>
        <hr className="col-8" />
        <div className="col-12 d-flex flex-row flex-wrap justify-content-center">
          <WithLoading isLoading={isLoading}>
            {
              getStudents()
            }
          </WithLoading>
        </div>
      </div>
    </div>
  );
};
