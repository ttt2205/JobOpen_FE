import SearchClient from '@/components/client/search.client';
import { Col, Divider, Row } from 'antd';
import styles from 'styles/client.module.scss';
import JobCard from '@/components/client/card/job.card';
import { useState } from 'react';

type SearchValues = {
  skills: string[];
  location: string[],
};


const ClientJobPage = (props: any) => {
    const [searchJob, setSearchJob] = useState<SearchValues>({
            skills: [],
            location: [],
        });
        
    return (
        <div className={styles["container"]} style={{ marginTop: 20 }}>
            <Row gutter={[20, 20]}>
                <Col span={24}>
                    <SearchClient setSearchJob={setSearchJob}/>
                </Col>
                <Divider />

                <Col span={24}>
                    <JobCard
                        showPagination={true}
                        searchJob={searchJob}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default ClientJobPage;