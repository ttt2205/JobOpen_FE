import { Divider } from 'antd';
import styles from 'styles/client.module.scss';
import SearchClient from '@/components/client/search.client';
import JobCard from '@/components/client/card/job.card';
import CompanyCard from '@/components/client/card/company.card';
import { useEffect, useState } from 'react';

type SearchValues = {
  skills: string[];
  location: string[],
};


const HomePage = () => {
    const [searchJob, setSearchJob] = useState<SearchValues>({
        skills: [],
        location: [],
    });
    
    return (
        <div className={`${styles["container"]} ${styles["home-section"]}`}>
            <div className="search-content" style={{ marginTop: 20 }}>
                <SearchClient setSearchJob={setSearchJob}/>
            </div>
            <Divider />
            <CompanyCard />
            <div style={{ margin: 50 }}></div>
            <Divider />
            <JobCard searchJob={searchJob}/>
        </div>
    )
}

export default HomePage;