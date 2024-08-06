type MediaType = "tv" | "movie" | "auto";
type Action = "move" | "hardlink" | "symlink" | "copy";

interface MetadataProviderApi {
    name: string;
    key?: string;
    url?: string;
    path?: string;
}

interface OperationOptions {
    user: string;
    group: string;
    chown: boolean;
    dir_mode: string;
    file_mode?: string;
    overwrite: boolean;
    infofile: boolean;
    shasum: boolean;
}

interface ScanConfig {
    src_path: string;
    media_type: MediaType;
    action: Action;
    tv_shows_output?: string;
    movies_output?: string;
    options?: OperationOptions;
}

interface BaseParams {
    min_split_length: number;
    suffix_the: boolean;
    file_format: string;
}

interface MovieParams extends BaseParams {
    subdir: boolean;
    dir_format: string;
    allow_metadata_tagging: boolean;
}

interface TvShowParams extends BaseParams {
    dir_format: string;
}

interface GlobalParams {
    valid_extensions: string[];
    split_characters: string[];
    tv: TvShowParams;
    movie: MovieParams;
}

interface Logging {
    logfile: string;
    loglevel: string;
}

export interface MediaSorterConfig {
    api: MetadataProviderApi[];
    scan_sources: ScanConfig[];
    search_overrides: { [key: string]: string };
    parameters: GlobalParams;
    options: OperationOptions;
    metainfo_map: { [key: string]: string };
    loging?: Logging;
    maximum_concurrent_requests: number;
    cache_path?: string;
    version: string;
    lib_version: string;
}