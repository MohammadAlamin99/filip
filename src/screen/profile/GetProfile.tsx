import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { fetchUserRole } from '../../services/user';
import EmployerProfile from './EmployerProfile';
import MainProfile from './MainProfile';

const GetProfile = () => {
    const { data: role } = useQuery({
        queryKey: ['userRole'],
        queryFn: fetchUserRole,
    });
    console.log(role)

    if (role === 'employer') {
        return <EmployerProfile />;
    }
    return (
        <MainProfile />
    )
}

export default GetProfile