import HomeCategoriesSkeleton from './HomeCategoriesSkeleton';
import HomeFeaturedSkeleton from './HomeFeaturedSkeleton';
import HomeAdvantageSkeleton from './HomeAdvantageSkeleton';

export default function HomeLoading() {
    return (
        <>
            <HomeCategoriesSkeleton />
            <HomeFeaturedSkeleton />
            <HomeAdvantageSkeleton />
        </>
    );
}
