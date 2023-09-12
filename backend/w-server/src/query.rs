use actix_web::web::Data;
use async_graphql::Object;
use async_graphql::Result as GqlResult;
use w_models::*;

use crate::server_context::ContextData;
pub struct Query;

#[Object]
impl Query {
    async fn howdy(&self, _ctx: &async_graphql::Context<'_>) -> &'static str {
        "partner"
    }

    // async fn channels(&self, ctx: &async_graphql::Context<'_>) -> GqlResult<Vec<Channel>> {
    //     println!("call channels");
    //     let data = ctx.data::<Data<ContextData>>()?;
    //     let pool = &data.pool;
    //     let config = &data.config;

    //     let channels = sqlx::query_as::<_, Channel>("select * from channels")
    //         .fetch_all(pool)
    //         .await?;
    //     Ok(channels)
    // }
}
