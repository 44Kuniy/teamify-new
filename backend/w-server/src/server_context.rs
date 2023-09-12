use w_config::Config;
use w_db::DbPool;

pub struct ContextData {
    pub config: Config,
    pub pool: DbPool,
}
