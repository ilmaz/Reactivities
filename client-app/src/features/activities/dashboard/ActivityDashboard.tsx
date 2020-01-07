import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Grid, Button, Loader } from 'semantic-ui-react'
import ActivityList from './ActivityList';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { RootStoreContext } from '../../../app/stores/rootStore';
import InfiniteScroll from 'react-infinite-scroller'
import ActivityFilters from './ActivityFilters';

const ActivityDashboard: React.FC= () => {
    const rootStore = useContext(RootStoreContext);
    const { loadingActivity, loadingInitial, setPage, page, totalPages } = rootStore.activityStore;
    const [loadingNext, setLoadingNext] = useState(false);
    
    const handleGetNext = () => { 
        debugger;
        setLoadingNext(true);
        setPage(page + 1);
        loadingActivity().then(() => setLoadingNext(false));
    }


    useEffect(()=>{
      loadingActivity();
    }, [loadingActivity]);
    if (loadingInitial && page === 0) return <LoadingComponent content='Loading activities...' />
      
    
    return (
        <Fragment>
            <Grid>
                <Grid.Column width={10}>
                    <InfiniteScroll 
                        pageStart={0}
                        loadMore={handleGetNext}
                        hasMore={!loadingNext && page + 1 < totalPages}
                        initialLoad={false}    
                    >
                         <ActivityList />
                    </InfiniteScroll>
                </Grid.Column>
                <Grid.Column width={6}>
                   <ActivityFilters/>
                </Grid.Column>
                <Grid.Column width={6}>
                    <Loader active={loadingNext} />
                </Grid.Column>
            </Grid>
        </Fragment>
    );
}
export default observer(ActivityDashboard);

